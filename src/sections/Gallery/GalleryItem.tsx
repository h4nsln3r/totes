import { useRef } from 'react';

import { GalleryImage } from '../../types/gallery';
import { useRowSpan } from './useRowSpan';

interface Props {
  image: GalleryImage;
  index: number;
  /** Antal kolumner bilden spänner över i rutnätet. */
  colSpan: number;
  /** Mellanrum mellan rutor (px) — måste matcha containerns `gap`. */
  gap: number;
  /** Höjd på en rad-enhet (px) — måste matcha containerns `grid-auto-rows`. */
  rowUnit: number;
  onOpen: (index: number) => void;
}

/**
 * En foto-ruta i masonry-rutnätet. Höjden mäts efter att bilden laddats (och
 * vid resize) och översätts till hur många rad-enheter rutan ska spänna över, så
 * rutnätet blir tätt och varierat utan att bilderna beskärs.
 */
const GalleryItem: React.FC<Props> = ({ image, index, colSpan, gap, rowUnit, onOpen }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [rowSpan, recompute] = useRowSpan(imgRef, gap, rowUnit);

  return (
    <button
      type="button"
      className="gallery__item"
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
      onClick={() => onOpen(index)}
      aria-label={image.alt ? `Visa bild: ${image.alt}` : 'Visa bild i full storlek'}
    >
      <img
        ref={imgRef}
        src={image.src}
        alt={image.alt ?? ''}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={recompute}
      />
    </button>
  );
};

export default GalleryItem;
