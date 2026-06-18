import { GalleryImage } from '../types/gallery';

import totesOrig from '../assets/images/totesorig.jpg';
// import totesAbout from '../assets/images/totesabout.jpg';
import eventPic from '../assets/gigs/eventpic.jpg';
import grid6126 from '../assets/grid/dsc_6126.jpg';
import grid6133 from '../assets/grid/dsc_6133.jpg';
import grid6138 from '../assets/grid/dsc_6138.jpg';
import grid6143 from '../assets/grid/dsc_6143.jpg';

/**
 * Bilder i galleriet. Lägg bara till nya rader här — ny bild = en import + en post.
 * `scale` styr hur stor bilden blir i rutnätet (andel av bredden). Höjden anpassas
 * automatiskt efter bildens proportioner.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  // Stor originalbild — visas i halva rutnätets bredd så den inte dominerar.
  { src: totesOrig, alt: 'Totes', scale: 0.5 },
  // "TO" uppe till höger om den stora bilden.
  { kind: 'logo-to', scale: 0.5 },
  { src: grid6126, alt: 'Totes' },
  { src: grid6133, alt: 'Totes' },
  // "TES" en bit längre ner, på andra sidan — som i hero-sektionen.
  { kind: 'logo-tes', scale: 0.5 },
  { src: eventPic, alt: 'Totes på scen' },
  { src: grid6138, alt: 'Totes', scale: 0.5 },
  { src: grid6143, alt: 'Totes' },
];
