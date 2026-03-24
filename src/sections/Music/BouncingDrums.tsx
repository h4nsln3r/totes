import { useEffect, useRef } from 'react';
import trummor from '../../assets/trummor.png';

const MIN_SPEED = 55;
const MAX_SPEED = 110;

const BouncingDrums = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const state = useRef({
    x: 0,
    y: 0,
    vx: MIN_SPEED,
    vy: MIN_SPEED,
    w: 80,
    h: 80,
    ready: false,
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

    const measure = () => {
      const cr = container.getBoundingClientRect();
      const iw = img.offsetWidth;
      const ih = img.offsetHeight;
      if (iw < 4 || ih < 4 || cr.width < 8 || cr.height < 8) return;

      const s = state.current;
      s.w = iw;
      s.h = ih;
      if (!s.ready) {
        s.ready = true;
        s.x = Math.max(0, Math.random() * Math.max(0, cr.width - iw));
        s.y = Math.max(0, Math.random() * Math.max(0, cr.height - ih));
        s.vx = randomSpeed();
        s.vy = randomSpeed();
      } else {
        s.x = Math.min(s.x, Math.max(0, cr.width - iw));
        s.y = Math.min(s.y, Math.max(0, cr.height - ih));
      }
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

      if (!s.ready || s.w < 4 || s.h < 4) {
        raf = requestAnimationFrame(tick);
        return;
      }

      let { x, y, vx, vy, w, h } = s;
      x += vx * dt;
      y += vy * dt;

      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
      } else if (x + w >= cw) {
        x = Math.max(0, cw - w);
        vx = -Math.abs(vx);
      }

      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
      } else if (y + h >= ch) {
        y = Math.max(0, ch - h);
        vy = -Math.abs(vy);
      }

      s.x = x;
      s.y = y;
      s.vx = vx;
      s.vy = vy;
      img.style.transform = `translate(${x}px, ${y}px)`;

      raf = requestAnimationFrame(tick);
    };

    const onLoad = () => {
      measure();
    };

    if (img.complete) {
      measure();
    } else {
      img.addEventListener('load', onLoad);
    }

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(container);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      img.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <div ref={containerRef} className="music__bounce-layer" aria-hidden>
      <img ref={imgRef} src={trummor} alt="" className="music__bounce-img" draggable={false} />
    </div>
  );
};

export default BouncingDrums;
