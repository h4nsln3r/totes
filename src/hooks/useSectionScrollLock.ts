import { useEffect, useMemo, useRef } from 'react';

type UseSectionScrollLockOptions = {
  disabled?: boolean;
  menuHeightPx?: number;
  wheelThresholdPx?: number;
  touchThresholdPx?: number;
  unlockAfterMs?: number;
  wheelStepCooldownMs?: number;
  sectionExtraOffsetPx?: Record<string, number>;
};

/**
 * Element vars innehåll får scrollas fritt utan att sektions-snappet aktiveras.
 * `.live__past-content` = past-gigs-listan, `[data-section-scroll-free]` = t.ex.
 * galleripanelen och lightboxen.
 */
const SCROLL_FREE_SELECTOR = '.live__past-content, [data-section-scroll-free]';

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

const SNAP_SUSPEND_ATTR = 'data-section-scroll-snap-suspend';

const setSnapSuspend = (suspend: boolean) => {
  if (suspend) document.documentElement.setAttribute(SNAP_SUSPEND_ATTR, '');
  else document.documentElement.removeAttribute(SNAP_SUSPEND_ATTR);
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

/** Samma landnings-Y som `scrollToSectionId` (för scrollbar-snap efter riktning). */
const getSnapScrollYForSection = (
  id: string,
  menuHeightPx: number,
  sectionExtraOffsetPx: Record<string, number>
): number | null => {
  const el = document.getElementById(id);
  if (!el) return null;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const extra = sectionExtraOffsetPx[id] ?? 0;
  return Math.max(0, top - menuHeightPx + extra);
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
    wheelStepCooldownMs = 420,
    sectionExtraOffsetPx = {},
  } = options ?? {};

  const sectionKey = useMemo(() => sectionIds.join('|'), [sectionIds]);

  const wheelAccumRef = useRef(0);
  const lastWheelDirectionRef = useRef<1 | -1 | null>(null);
  const wheelBlockUntilRef = useRef(0);
  const lockedRef = useRef(false);
  const unlockRafRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchLastYRef = useRef<number | null>(null);
  const touchTargetElRef = useRef<HTMLElement | null>(null);

  const lastWheelAtRef = useRef(0);
  const prevScrollYRef = useRef<number | null>(null);
  const lastNativeScrollDirRef = useRef<1 | -1 | null>(null);

  useEffect(() => {
    if (disabled) return;

    const desktopMql = window.matchMedia('(min-width: 768px)');
    const supportsScrollEnd = 'onscrollend' in window;

    const onUnlockIfNeeded = (targetY: number) => {
      const startedAt = performance.now();
      const tick = () => {
        if (!lockedRef.current) return;

        const stillCloseEnough = Math.abs(window.scrollY - targetY) < 2;
        const timedOut = performance.now() - startedAt > unlockAfterMs;
        if (stillCloseEnough || timedOut) {
          lockedRef.current = false;
          setSnapSuspend(false);
          wheelAccumRef.current = 0;
          lastWheelDirectionRef.current = null;
          // Viktigt för touchpad: blockera en kort stund även EFTER att snapen är klar
          // så kvarvarande inertia inte triggar ett extra sektionshopp.
          wheelBlockUntilRef.current = Math.max(
            wheelBlockUntilRef.current,
            performance.now() + wheelStepCooldownMs
          );
          unlockRafRef.current = null;
          return;
        }

        unlockRafRef.current = requestAnimationFrame(tick);
      };

      unlockRafRef.current = requestAnimationFrame(tick);
    };

    /** Desktop + native scroll (t.ex. scrollbar): efter scrollslut, åk smooth till sektionen i scrollriktningen. */
    const onDesktopScrollbarSnapEnd = () => {
      if (!desktopMql.matches) return;
      if (lockedRef.current) return;

      const WHEEL_SUPPRESS_MS = 450;
      if (performance.now() - lastWheelAtRef.current < WHEEL_SUPPRESS_MS) return;

      const points = sectionIds
        .map((id) => {
          const yy = getSnapScrollYForSection(id, menuHeightPx, sectionExtraOffsetPx);
          return yy === null ? null : { id, y: yy };
        })
        .filter((p): p is { id: string; y: number } => p !== null)
        .sort((a, b) => a.y - b.y);

      if (points.length === 0) return;

      const y = window.scrollY;
      const TOL = 4;

      if (points.some((p) => Math.abs(y - p.y) <= TOL)) return;

      for (let i = 0; i < points.length - 1; i++) {
        const lo = points[i].y;
        const hi = points[i + 1].y;
        if (y > lo + TOL && y < hi - TOL) {
          const dir = lastNativeScrollDirRef.current;
          const targetY =
            dir === 1 ? hi : dir === -1 ? lo : y - lo <= hi - y ? lo : hi;
          if (Math.abs(y - targetY) < TOL) return;

          lockedRef.current = true;
          setSnapSuspend(true);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          onUnlockIfNeeded(targetY);
          return;
        }
      }

      let nearest = points[0].y;
      let nearestDist = Math.abs(y - nearest);
      for (const p of points) {
        const d = Math.abs(y - p.y);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = p.y;
        }
      }
      if (nearestDist < TOL) return;

      lockedRef.current = true;
      setSnapSuspend(true);
      window.scrollTo({ top: nearest, behavior: 'smooth' });
      onUnlockIfNeeded(nearest);
    };

    let scrollEndDebounce: ReturnType<typeof setTimeout> | null = null;
    const clearScrollEndDebounce = () => {
      if (scrollEndDebounce !== null) {
        clearTimeout(scrollEndDebounce);
        scrollEndDebounce = null;
      }
    };

    const onNativeScrollTrackDirection = () => {
      if (!desktopMql.matches) return;

      const sy = window.scrollY;
      if (lockedRef.current) {
        prevScrollYRef.current = sy;
        return;
      }

      const prev = prevScrollYRef.current;
      if (prev !== null && Math.abs(sy - prev) >= 1) {
        lastNativeScrollDirRef.current = sy > prev ? 1 : -1;
      }
      prevScrollYRef.current = sy;
    };

    const scheduleScrollEndFallback = () => {
      if (!desktopMql.matches || lockedRef.current) return;
      clearScrollEndDebounce();
      scrollEndDebounce = window.setTimeout(() => {
        scrollEndDebounce = null;
        onDesktopScrollbarSnapEnd();
      }, 130);
    };

    prevScrollYRef.current = window.scrollY;

    const onScrollBundle = () => {
      onNativeScrollTrackDirection();
      if (!supportsScrollEnd) scheduleScrollEndFallback();
    };

    window.addEventListener('scroll', onScrollBundle, { passive: true });
    if (supportsScrollEnd) {
      window.addEventListener('scrollend', onDesktopScrollbarSnapEnd as EventListener);
    }

    const tryStep = (direction: 1 | -1) => {
      if (lockedRef.current) return;

      const currentIndex = getSectionIndexFromScroll(sectionIds, menuHeightPx);
      const nextIndex = clampIndex(currentIndex + direction, 0, sectionIds.length - 1);
      if (nextIndex === currentIndex) return;
      const nextId = sectionIds[nextIndex];
      if (!nextId) return;

      lockedRef.current = true;
      setSnapSuspend(true);
      const extraOffset = sectionExtraOffsetPx[nextId] ?? 0;
      const targetY = scrollToSectionId(nextId, menuHeightPx, extraOffset);
      if (targetY == null) {
        lockedRef.current = false;
        setSnapSuspend(false);
        wheelAccumRef.current = 0;
        return;
      }
      onUnlockIfNeeded(targetY);
    };

    const onWheel = (e: WheelEvent) => {
      lastWheelAtRef.current = performance.now();

      const targetEl = e.target as HTMLElement | null;
      const isInScrollFree = Boolean(targetEl?.closest(SCROLL_FREE_SELECTOR));

      if (isInScrollFree) {
        // Låt användaren scrolla inne i fria zoner (past-gigs, galleri) utan att scroll-lock steppar sektioner.
        return;
      }

      if (lockedRef.current) {
        // Behåll "snap"-känslan: tillåt inte vanlig scroll att flytta runt oss
        // medan vi redan smooth-scrollar till en sektion.
        e.preventDefault();
        return;
      }

      // Touchpad-inertia efter ett snap-steg kan annars orsaka oönskade extra hopp.
      if (performance.now() < wheelBlockUntilRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY ?? 0;
      if (deltaY === 0) return;
      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;

      // Mushjul skickar oftast DOM_DELTA_LINE (~100px/notch) och når sällan tröskeln på en
      // enda event — då blandades naturlig scroll med snap. Ett line/page-steg = ett sektionssteg.
      const isDiscreteWheel =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE || e.deltaMode === WheelEvent.DOM_DELTA_PAGE;

      if (isDiscreteWheel) {
        if (!canStepToAdjacentSection(sectionIds, menuHeightPx, direction)) {
          return;
        }
        e.preventDefault();
        wheelAccumRef.current = 0;
        lastWheelDirectionRef.current = null;
        tryStep(direction);
        wheelBlockUntilRef.current = Math.max(
          wheelBlockUntilRef.current,
          performance.now() + wheelStepCooldownMs
        );
        return;
      }

      // Trackpad: bygg upp intention, men lås naturlig scroll så sidan inte driver mellan sektioner.
      if (!canStepToAdjacentSection(sectionIds, menuHeightPx, direction)) {
        wheelAccumRef.current = 0;
        lastWheelDirectionRef.current = null;
        return;
      }
      e.preventDefault();

      // Om användaren byter riktning: starta om ackumuleringen för att undvika "ryckiga" dubbelsnap.
      if (lastWheelDirectionRef.current != null && lastWheelDirectionRef.current !== direction) {
        wheelAccumRef.current = 0;
      }
      lastWheelDirectionRef.current = direction;

      // Trackpad: låt småscroll ackumuleras tills tröskeln känns som ett tydligt steg.
      wheelAccumRef.current += deltaY;

      if (Math.abs(wheelAccumRef.current) < wheelThresholdPx) return;

      const stepDirection: 1 | -1 = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;
      lastWheelDirectionRef.current = null;
      tryStep(stepDirection);
      wheelBlockUntilRef.current = Math.max(
        wheelBlockUntilRef.current,
        performance.now() + wheelStepCooldownMs
      );
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
      const isInScrollFree = Boolean(targetEl?.closest(SCROLL_FREE_SELECTOR));
      if (isInScrollFree) return;

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

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchLastYRef.current = null;
      const targetEl = touchTargetElRef.current;
      touchTargetElRef.current = null;
      if (targetEl?.closest(SCROLL_FREE_SELECTOR)) return;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollBundle as EventListener);
      clearScrollEndDebounce();
      if (supportsScrollEnd) {
        window.removeEventListener('scrollend', onDesktopScrollbarSnapEnd as EventListener);
      }
      window.removeEventListener('wheel', onWheel as EventListener);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart as EventListener);
      window.removeEventListener('touchmove', onTouchMove as EventListener);
      window.removeEventListener('touchend', onTouchEnd as EventListener);
      if (unlockRafRef.current != null) cancelAnimationFrame(unlockRafRef.current);
      lockedRef.current = false;
      setSnapSuspend(false);
      wheelAccumRef.current = 0;
      lastWheelDirectionRef.current = null;
      wheelBlockUntilRef.current = 0;
      unlockRafRef.current = null;
      touchStartYRef.current = null;
      touchLastYRef.current = null;
      touchTargetElRef.current = null;
    };
  }, [
    disabled,
    sectionKey,
    menuHeightPx,
    wheelThresholdPx,
    touchThresholdPx,
    unlockAfterMs,
    wheelStepCooldownMs,
    sectionIds,
    sectionExtraOffsetPx,
  ]);
}

