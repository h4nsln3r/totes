import { useRef } from 'react';

import { useRowSpan } from './useRowSpan';
import TO from '../../assets/logo/to.png';
import TES from '../../assets/logo/tes.png';

interface Props {
  /** Vilken logotyp-del som ska visas. */
  part: 'to' | 'tes';
  /** Antal kolumner rutan spänner över i rutnätet. */
  colSpan: number;
  /** Mellanrum mellan rutor (px) — måste matcha containerns `gap`. */
  gap: number;
  /** Höjd på en rad-enhet (px) — måste matcha containerns `grid-auto-rows`. */
  rowUnit: number;
}

/**
 * En logotyp-del ("TO" eller "TES" som i hero-sektionen) som flyter på den mörka
 * bakgrunden. Görs vit via filter. Inte klickbar (öppnas inte i lightbox).
 */
const GalleryLogoTile: React.FC<Props> = ({ part, colSpan, gap, rowUnit }) => {
  // Mät den inre boxen (logga + padding) så grid-cellen blir tillräckligt hög
  // och loggan inte hamnar ovanpå bilden under.
  const innerRef = useRef<HTMLDivElement>(null);
  const [rowSpan, recompute] = useRowSpan(innerRef, gap, rowUnit);

  return (
    <div
      className="gallery__item gallery__item--logo"
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
      aria-hidden
    >
      <div className="gallery__logo-inner" ref={innerRef}>
        <img
          src={part === 'to' ? TO : TES}
          alt=""
          decoding="async"
          draggable={false}
          onLoad={recompute}
        />
      </div>
    </div>
  );
};

export default GalleryLogoTile;
