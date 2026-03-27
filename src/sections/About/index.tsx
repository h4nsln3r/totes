import SectionWrapper from "..";
import totespic from "../../assets/images/totesabout.jpg";
import saxPic from "../../assets/sketches/sax.png";

import "./about.scss";
import { useCallback, useEffect, useRef } from "react";

interface Props {
  isMobile: boolean;
}

function unwrapDegDelta(delta: number): number {
  let d = delta;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

const Info: React.FC<Props> = ({ isMobile }) => {
  const spinWrapRef = useRef<HTMLDivElement>(null);
  const spinDegRef = useRef(0);
  const velocityDegPerSecRef = useRef(0);
  const draggingRef = useRef(false);
  const dragRef = useRef({ lastAngle: 0, lastTime: 0, cx: 0, cy: 0 });
  const rafRef = useRef<number>(0);
  const inertiaTimeRef = useRef<number | null>(null);

  const applySpin = useCallback(() => {
    const el = spinWrapRef.current;
    if (!el) return;
    el.style.setProperty("--sax-spin", `${spinDegRef.current}deg`);
  }, []);

  const stopInertia = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    inertiaTimeRef.current = null;
  }, []);

  const inertiaStep = useCallback(
    (now: number) => {
      if (inertiaTimeRef.current == null) {
        inertiaTimeRef.current = now;
      }
      const dt = Math.min((now - inertiaTimeRef.current) / 1000, 0.048);
      inertiaTimeRef.current = now;

      spinDegRef.current += velocityDegPerSecRef.current * dt;
      // Exponentiell dämpning (oberoende av bildfrekvens)
      velocityDegPerSecRef.current *= Math.exp(-3.2 * dt);

      applySpin();

      if (Math.abs(velocityDegPerSecRef.current) < 8) {
        velocityDegPerSecRef.current = 0;
        stopInertia();
        return;
      }

      rafRef.current = requestAnimationFrame(inertiaStep);
    },
    [applySpin, stopInertia]
  );

  useEffect(() => {
    applySpin();
    return () => stopInertia();
  }, [applySpin, stopInertia]);

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    stopInertia();
    draggingRef.current = true;
    velocityDegPerSecRef.current = 0;

    const img = e.currentTarget;
    img.setPointerCapture(e.pointerId);
    const spinEl = spinWrapRef.current;
    const rect = spinEl?.getBoundingClientRect() ?? img.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle =
      (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    const now = performance.now();
    dragRef.current = { lastAngle: angle, lastTime: now, cx, cy };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!draggingRef.current) return;
    const spinEl = spinWrapRef.current;
    const rect = spinEl?.getBoundingClientRect();
    const { lastAngle, lastTime } = dragRef.current;
    const cx = rect ? rect.left + rect.width / 2 : dragRef.current.cx;
    const cy = rect ? rect.top + rect.height / 2 : dragRef.current.cy;
    const now = performance.now();
    const angle =
      (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    const delta = unwrapDegDelta(angle - lastAngle);
    spinDegRef.current += delta;
    const dt = (now - lastTime) / 1000;
    if (dt > 0) {
      velocityDegPerSecRef.current = delta / dt;
    }
    dragRef.current = { cx, cy, lastAngle: angle, lastTime: now };
    applySpin();
  };

  const endDrag = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    const v = Math.abs(velocityDegPerSecRef.current);
    if (v > 120) {
      inertiaTimeRef.current = null;
      rafRef.current = requestAnimationFrame(inertiaStep);
    } else {
      velocityDegPerSecRef.current = 0;
    }
  };

  const interactiveSaxHandlers = isMobile
    ? {}
    : {
        onPointerDown,
        onPointerMove,
        onPointerUp: endDrag,
        onPointerCancel: endDrag,
      };

  return (
    <SectionWrapper sectionName="about">
      {isMobile ? (
        <>
          <div className="about__center-copy">
            <p>Vi är ett band från Kalmar men vi bor i Malmö. Vi gillar starka melodier och sväninga rytmer och mullrande bas.</p>
            <br />
            <p>I sommar spelar vi på flera ställen i Malmö. Och snart kommer även debutsingeln Sure/Unshore</p>
          </div>
          <div className="about__sax-wrap--sm" aria-hidden>
            <div className="about__sax-hover-scale about__sax-hover-scale">
              <div ref={spinWrapRef} className="about__sax-spin">
                <img
                  className="about__sax"
                  src={saxPic}
                  alt=""
                  draggable={false}
                  {...interactiveSaxHandlers}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col--55 margin__top--auto">
            <img className="about__image" src={totespic} alt="Band" />
          </div>
          <div className="col--45">
            <div className="about__center-copy">
              <p>Vi är ett band från Kalmar men vi bor i Malmö. Vi gillar starka melodier och sväninga rytmer och mullrande bas.</p>
              <br />
              <p>I sommar spelar vi på flera ställen i Malmö. Och snart kommer även debutsingeln Sure/Unshore</p>
            </div>
            <div className="about__sax-wrap" aria-hidden>
              <div className="about__sax-hover-scale">
                <div ref={spinWrapRef} className="about__sax-spin">
                  <img
                    className="about__sax"
                    src={saxPic}
                    alt=""
                    draggable={false}
                    {...interactiveSaxHandlers}
                  />
                </div>
              </div>
            </div>
          </div>
        </>)}

    </SectionWrapper>
  );
};

export default Info;
