import { useCallback, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { GalleryImage } from '../../types/gallery';

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/** Fullskärmsvisning av en bild med pil-navigering. Esc/klick utanför stänger. */
const Lightbox: React.FC<Props> = ({ images, index, onClose, onNavigate }) => {
  const image = images[index];
  const count = images.length;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + count) % count);
  }, [index, count, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % count);
  }, [index, count, onNavigate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, goPrev, goNext]);

  // Lås bakgrundsscroll medan lightboxen är öppen.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!image) return null;

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || 'Bild'}
      data-section-scroll-free
      onClick={onClose}
    >
      <button
        type="button"
        className="gallery-lightbox__close"
        aria-label="Stäng"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {count > 1 && (
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          aria-label="Föregående bild"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
        >
          <FaChevronLeft />
        </button>
      )}

      <img
        className="gallery-lightbox__image"
        src={image.src}
        alt={image.alt ?? ''}
        decoding="async"
        draggable={false}
        onClick={(e) => e.stopPropagation()}
      />

      {count > 1 && (
        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          aria-label="Nästa bild"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Lightbox;
