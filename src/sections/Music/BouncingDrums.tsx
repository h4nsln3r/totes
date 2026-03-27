import { useEffect, useRef } from 'react';
import trummor from '../../assets/sketches/trummor.png';

const MIN_SPEED = 55;
const MAX_SPEED = 110;
const THROW_MULT = 2.35;
const MAX_THROW_SPEED = 520;
const HOLD_SCALE_MAX = 1.42;
const HOLD_SCALE_MS = 380;

const BouncingDrums = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const state = useRef({
    x: 0,
    y: 0,
    vx: MIN_SPEED,
    vy: MIN_SPEED,
    baseW: 80,
    baseH: 80,
    scale: 1,
    ready: false,
    dragging: false,
    grabOX: 0,
    grabOY: 0,
    holdStart: 0,
    lastPtrX: 0,
    lastPtrY: 0,
    lastPtrT: 0,
    throwVx: 0,
    throwVy: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.classList.add('music__bounce-layer--reduced');
      return;
    }

    const randomSpeed = () => (Math.random() > 0.5 ? 1 : -1) * (MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED));

    const applyTransform = () => {
      const s = state.current;
      img.style.transform = `translate(${s.x}px, ${s.y}px) scale(${s.scale})`;
    };

    const measure = () => {
      const cr = container.getBoundingClientRect();
      const iw = img.offsetWidth;
      const ih = img.offsetHeight;
      const s = state.current;
      if (iw < 4 || ih < 4 || cr.width < 8 || cr.height < 8) return;

      s.baseW = iw;
      s.baseH = ih;
      if (!s.ready) {
        s.ready = true;
        s.x = Math.max(0, Math.random() * Math.max(0, cr.width - iw));
        s.y = Math.max(0, Math.random() * Math.max(0, cr.height - ih));
        s.vx = randomSpeed();
        s.vy = randomSpeed();
        applyTransform();
      } else {
        const sc = Math.max(s.scale, 1);
        s.x = Math.min(s.x, Math.max(0, cr.width - s.baseW * sc));
        s.y = Math.min(s.y, Math.max(0, cr.height - s.baseH * sc));
        applyTransform();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      const s = state.current;
      if (!s.ready) return;

      const cr = container.getBoundingClientRect();
      const px = e.clientX - cr.left;
      const py = e.clientY - cr.top;

      s.dragging = true;
      s.grabOX = px - s.x;
      s.grabOY = py - s.y;
      s.holdStart = performance.now();
      s.lastPtrX = px;
      s.lastPtrY = py;
      s.lastPtrT = s.holdStart;
      s.throwVx = 0;
      s.throwVy = 0;

      img.setPointerCapture(e.pointerId);
      img.classList.add('music__bounce-img--dragging');
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragging) return;

      const cr = container.getBoundingClientRect();
      const px = e.clientX - cr.left;
      const py = e.clientY - cr.top;
      const now = performance.now();

      let x = px - s.grabOX;
      let y = py - s.grabOY;

      const holdT = now - s.holdStart;
      const targetScale = 1 + Math.min(HOLD_SCALE_MAX - 1, (holdT / HOLD_SCALE_MS) * (HOLD_SCALE_MAX - 1));
      s.scale += (targetScale - s.scale) * 0.22;

      const sc = Math.max(s.scale, 1);
      const maxX = Math.max(0, cr.width - s.baseW * sc);
      const maxY = Math.max(0, cr.height - s.baseH * sc);
      x = Math.max(0, Math.min(maxX, x));
      y = Math.max(0, Math.min(maxY, y));

      const dt = now - s.lastPtrT;
      if (dt > 0 && dt < 120) {
        const instVx = ((px - s.lastPtrX) / dt) * 1000;
        const instVy = ((py - s.lastPtrY) / dt) * 1000;
        s.throwVx = s.throwVx * 0.35 + instVx * 0.65;
        s.throwVy = s.throwVy * 0.35 + instVy * 0.65;
      }

      s.lastPtrX = px;
      s.lastPtrY = py;
      s.lastPtrT = now;
      s.x = x;
      s.y = y;
      applyTransform();
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragging) return;
      s.dragging = false;
      try {
        img.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      img.classList.remove('music__bounce-img--dragging');

      let vx = s.throwVx * THROW_MULT;
      let vy = s.throwVy * THROW_MULT;
      let mag = Math.hypot(vx, vy);

      if (mag > MAX_THROW_SPEED) {
        vx = (vx / mag) * MAX_THROW_SPEED;
        vy = (vy / mag) * MAX_THROW_SPEED;
        mag = MAX_THROW_SPEED;
      }

      if (mag < 120) {
        if (mag > 8) {
          vx = (vx / mag) * 160;
          vy = (vy / mag) * 160;
        } else {
          const a = Math.random() * Math.PI * 2;
          vx = Math.cos(a) * 140;
          vy = Math.sin(a) * 140;
        }
      }

      s.vx = vx;
      s.vy = vy;
    };

    const onPointerCancel = (e: PointerEvent) => {
      onPointerUp(e);
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;

      const cr = container.getBoundingClientRect();
      const cw = cr.width;
      const ch = cr.height;
      const s = state.current;

      if (!s.ready || s.baseW < 4 || s.baseH < 4) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (s.dragging) {
        applyTransform();
        raf = requestAnimationFrame(tick);
        return;
      }

      if (s.scale > 1.002) {
        s.scale += (1 - s.scale) * Math.min(1, dt * 14);
      } else {
        s.scale = 1;
      }

      let { x, y, vx, vy, baseW, baseH } = s;
      const sc = Math.max(s.scale, 1);
      const effW = baseW * sc;
      const effH = baseH * sc;

      x += vx * dt;
      y += vy * dt;

      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
      } else if (x + effW >= cw) {
        x = Math.max(0, cw - effW);
        vx = -Math.abs(vx);
      }

      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
      } else if (y + effH >= ch) {
        y = Math.max(0, ch - effH);
        vy = -Math.abs(vy);
      }

      s.x = x;
      s.y = y;
      s.vx = vx;
      s.vy = vy;
      applyTransform();

      raf = requestAnimationFrame(tick);
    };

    const onLoad = () => measure();

    img.addEventListener('pointerdown', onPointerDown);
    img.addEventListener('pointermove', onPointerMove);
    img.addEventListener('pointerup', onPointerUp);
    img.addEventListener('pointercancel', onPointerCancel);

    if (img.complete) {
      measure();
    } else {
      img.addEventListener('load', onLoad);
    }

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      img.removeEventListener('load', onLoad);
      img.removeEventListener('pointerdown', onPointerDown);
      img.removeEventListener('pointermove', onPointerMove);
      img.removeEventListener('pointerup', onPointerUp);
      img.removeEventListener('pointercancel', onPointerCancel);
    };
  }, []);

  return (
    <div ref={containerRef} className="music__bounce-layer" aria-hidden>
      <img
        ref={imgRef}
        src={trummor}
        alt=""
        className="music__bounce-img"
        draggable={false}
      />
    </div>
  );
};

export default BouncingDrums;
