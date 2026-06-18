import { CSSProperties, useState } from 'react';

import SectionWrapper from '..';
import { GALLERY_IMAGES } from '../../data/gallery';
import { GalleryImage } from '../../types/gallery';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import GalleryItem from './GalleryItem';
import GalleryLogoTile from './GalleryLogoTile';
import Lightbox from './Lightbox';
import './gallery.scss';

interface Props {
  isMobile: boolean;
  /** Bilder att visa. Default: `GALLERY_IMAGES` från data/gallery.ts. */
  images?: GalleryImage[];
  /** Tvinga antal kolumner. Default: responsivt (2 mobil / 3 platta / 4 desktop). */
  columns?: number;
  /** Mellanrum mellan rutor i px. Default 4. */
  gap?: number;
  /** Höjd på en rad-enhet i px (mindre = finare masonry). Default 6. */
  rowUnit?: number;
}

const Gallery: React.FC<Props> = ({
  isMobile,
  images = GALLERY_IMAGES,
  columns,
  gap = 4,
  rowUnit = 6,
}) => {
  const isTablet = useMediaQuery('(max-width: 1100px)');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cols = columns ?? (isMobile ? 2 : isTablet ? 3 : 4);

  const gridStyle: CSSProperties = {
    ['--gallery-cols' as string]: String(cols),
    gridAutoRows: `${rowUnit}px`,
    gap: `${gap}px`,
  };

  // Lightboxen bläddrar bara bland foton — logotyp-rutor hoppas över.
  const photos = images.filter(
    (image) => image.kind !== 'logo-to' && image.kind !== 'logo-tes'
  );

  // Räknar foto-index separat så lightbox-index stämmer trots logotyp-rutor.
  let photoIndex = -1;

  return (
    <SectionWrapper sectionName="gallery" className="gallery">
      <div className="gallery__inner">
        <div className="gallery__scroll" data-section-scroll-free>
          <div className="gallery__grid" style={gridStyle}>
            {images.map((image, index) => {
              const colSpan = image.scale
                ? Math.min(cols, Math.max(1, Math.round(image.scale * cols)))
                : 1;

              if (image.kind === 'logo-to' || image.kind === 'logo-tes') {
                return (
                  <GalleryLogoTile
                    key={`logo-${index}`}
                    part={image.kind === 'logo-to' ? 'to' : 'tes'}
                    colSpan={colSpan}
                    gap={gap}
                    rowUnit={rowUnit}
                  />
                );
              }

              photoIndex += 1;
              const openIndex = photoIndex;

              return (
                <GalleryItem
                  key={`${image.src}-${index}`}
                  image={image}
                  index={openIndex}
                  colSpan={colSpan}
                  gap={gap}
                  rowUnit={rowUnit}
                  onOpen={setActiveIndex}
                />
              );
            })}
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={photos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </SectionWrapper>
  );
};

export default Gallery;
