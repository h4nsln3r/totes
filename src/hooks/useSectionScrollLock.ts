import { useEffect, useMemo, useRef } from 'react';

type UseSectionScrollLockOptions = {
  disabled?: boolean;
  menuHeightPx?: number;
  wheelThresholdPx?: number;
  touchThresholdPx?: number;
  unlockAfterMs?: number;
  sectionExtraOffsetPx?: Record<string, number>;
};

const clampIndex = (index: number, min: number, max: number) => Math.max(min, Math.min(max, index));

const getSectionIndexFromScroll = (sectionIds: string[], menuHeightPx: number) => {
  const anchorY = window.scrollY + menuHeightPx + 2;

  for (let i = 0; i < sectionIds.length; i++) {
    const id = sectionIds[i];
    const el = document.getElementById(id);
    if (!el) continue;

    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (anchorY >= top && anchorY < bottom) return i;
  }

  // Om vi inte hittade en “inuti”, välj närmaste sektion uppifrån.
  let best = 0;
  for (let i = 0; i < sectionIds.length; i++) {
    const id = sectionIds[i];
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= anchorY) best = i;
  }
  return best;
};

const scrollToSectionId = (id: string, menuHeightPx: number, extraOffsetPx = 0) => {
  const el = document.getElementById(id);
  if (!el) return null;

  // Alignera sektionens topp strax under den fasta menyn.
  const top = el.getBoundingClientRect().top + window.scrollY;
  const targetY = top - menuHeightPx + extraOffsetPx;
  const clamped = Math.max(0, targetY);

  window.scrollTo({ top: clamped, behavior: 'smooth' });
  return clamped;
};

/** True om ett steg i den riktningen faktiskt byter sektion. */
const canStepToAdjacentSection = (sectionIds: string[], menuHeightPx: number, direction: 1 | -1) => {
  const currentIndex = getSectionIndexFromScroll(sectionIds, menuHeightPx);
  const nextIndex = clampIndex(currentIndex + direction, 0, sectionIds.length - 1);
  return nextIndex !== currentIndex;
};

export function useSectionScrollLock(sectionIds: string[], options?: UseSectionScrollLockOptions) {
  const {
    disabled = false,
    menuHeightPx = 50,
    wheelThresholdPx = 110,
    touchThresholdPx = 60,
    unlockAfterMs = 900,
    sectionExtraOffsetPx = {},
  } = options ?? {};

  const sectionKey = useMemo(() => sectionIds.join('|'), [sectionIds]);

  const wheelAccumRef = useRef(0);
  const lockedRef = useRef(false);
  const unlockRafRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchLastYRef = useRef<number | null>(null);
  const touchTargetElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const onUnlockIfNeeded = (targetY: number) => {
      const startedAt = performance.now();
      const tick = () => {
        if (!lockedRef.current) return;

        const stillCloseEnough = Math.abs(window.scrollY - targetY) < 2;
        const timedOut = performance.now() - startedAt > unlockAfterMs;
        if (stillCloseEnough || timedOut) {
          lockedRef.current = false;
          wheelAccumRef.current = 0;
          unlockRafRef.current = null;
          return;
        }

        unlockRafRef.current = requestAnimationFrame(tick);
      };

      unlockRafRef.current = requestAnimationFrame(tick);
    };

    const tryStep = (direction: 1 | -1) => {
      if (lockedRef.current) return;

      const currentIndex = getSectionIndexFromScroll(sectionIds, menuHeightPx);
      const nextIndex = clampIndex(currentIndex + direction, 0, sectionIds.length - 1);
      if (nextIndex === currentIndex) return;
      const nextId = sectionIds[nextIndex];
      if (!nextId) return;

      lockedRef.current = true;
      const extraOffset = sectionExtraOffsetPx[nextId] ?? 0;
      const targetY = scrollToSectionId(nextId, menuHeightPx, extraOffset);
      if (targetY == null) {
        lockedRef.current = false;
        wheelAccumRef.current = 0;
        return;
      }
      onUnlockIfNeeded(targetY);
    };

    const onWheel = (e: WheelEvent) => {
      const targetEl = e.target as HTMLElement | null;
      const isInPastContent = Boolean(targetEl?.closest('.live__past-content'));

      if (isInPastContent) {
        // Låt användaren scrolla inne i past-gigs utan att scroll-lock steppar sektioner.
        return;
      }

      if (lockedRef.current) {
        // Behåll "snap"-känslan: tillåt inte vanlig scroll att flytta runt oss
        // medan vi redan smooth-scrollar till en sektion.
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY ?? 0;
      if (deltaY === 0) return;

      // Mushjul skickar oftast DOM_DELTA_LINE (~100px/notch) och når sällan tröskeln på en
      // enda event — då blandades naturlig scroll med snap. Ett line/page-steg = ett sektionssteg.
      const isDiscreteWheel =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE || e.deltaMode === WheelEvent.DOM_DELTA_PAGE;

      if (isDiscreteWheel) {
        const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
        if (!canStepToAdjacentSection(sectionIds, menuHeightPx, direction)) {
          return;
        }
        e.preventDefault();
        wheelAccumRef.current = 0;
        tryStep(direction);
        return;
      }

      // Trackpad: låt “småscroll” ackumuleras tills det känns som ett tydligt steg.
      wheelAccumRef.current += deltaY;

      if (Math.abs(wheelAccumRef.current) < wheelThresholdPx) return;

      const direction: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1;
      if (!canStepToAdjacentSection(sectionIds, menuHeightPx, direction)) {
        wheelAccumRef.current = 0;
        return;
      }

      e.preventDefault();
      wheelAccumRef.current = 0;
      tryStep(direction);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (lockedRef.current) return;

      const key = e.key;
      const wantsNext =
        key === 'ArrowDown' || key === 'PageDown' || key === ' ' /* Space */ || key === 'Enter';
      const wantsPrev = key === 'ArrowUp' || key === 'PageUp';

      if (!wantsNext && !wantsPrev) return;

      e.preventDefault();
      tryStep(wantsNext ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches?.[0];
      if (!touch) return;
      touchStartYRef.current = touch.clientY;
      touchLastYRef.current = touch.clientY;
      touchTargetElRef.current = e.target as HTMLElement | null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const targetEl = touchTargetElRef.current ?? (e.target as HTMLElement | null);
      const isInPastContent = Boolean(targetEl?.closest('.live__past-content'));
      if (isInPastContent) return;

      const startY = touchStartYRef.current;
      const touch = e.changedTouches?.[0];
      if (startY == null || !touch) return;

      // Blockera naturlig mobilscroll för tydlig "snap/gummiband"-känsla.
      e.preventDefault();

      if (lockedRef.current) return;

      const deltaY = startY - touch.clientY;
      touchLastYRef.current = touch.clientY;
      if (Math.abs(deltaY) < touchThresholdPx) return;

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      if (!canStepToAdjacentSection(sectionIds, menuHeightPx, direction)) {
        touchStartYRef.current = touch.clientY;
        return;
      }
      tryStep(direction);
      // Starta om swipe-referensen så samma drag inte triggar flera hopp direkt.
      touchStartYRef.current = touch.clientY;
    };

    const onTouchEnd = (_e: TouchEvent) => {
      touchStartYRef.current = null;
      touchLastYRef.current = null;
      const targetEl = touchTargetElRef.current;
      touchTargetElRef.current = null;
      if (targetEl?.closest('.live__past-content')) return;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel as EventListener);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('touchend', onTouchEnd as EventListener);
      if (unlockRafRef.current != null) cancelAnimationFrame(unlockRafRef.current);
      lockedRef.current = false;
      wheelAccumRef.current = 0;
      unlockRafRef.current = null;
      touchStartYRef.current = null;
      touchLastYRef.current = null;
      touchTargetElRef.current = null;
    };
  }, [disabled, sectionKey, menuHeightPx, wheelThresholdPx, touchThresholdPx, unlockAfterMs, sectionIds]);
}

