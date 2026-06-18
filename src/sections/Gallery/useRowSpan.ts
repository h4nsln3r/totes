import { RefObject, useCallback, useEffect, useState } from 'react';

/**
 * Mäter höjden på `ref`-elementet och översätter den till hur många rad-enheter
 * en masonry-ruta ska spänna över. Räknas om vid resize (ResizeObserver) och
 * kan triggas manuellt via den returnerade `recompute`-funktionen (t.ex. på
 * bildens `onLoad`).
 *
 * `gap` och `rowUnit` måste matcha rutnätets `gap` respektive `grid-auto-rows`.
 */
export function useRowSpan(
  ref: RefObject<HTMLElement>,
  gap: number,
  rowUnit: number
): [number, () => void] {
  const [rowSpan, setRowSpan] = useState(1);

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const height = el.getBoundingClientRect().height;
    if (!height) return;
    setRowSpan(Math.max(1, Math.round((height + gap) / (rowUnit + gap))));
  }, [ref, gap, rowUnit]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, recompute]);

  return [rowSpan, recompute];
}
