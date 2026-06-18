export type GalleryImage = {
  /** Importerad bildkälla (Vite-asset) eller URL. Krävs för vanliga bilder. */
  src?: string;
  /** Alt-text för tillgänglighet. Tom sträng = dekorativ. */
  alt?: string;
  /**
   * Hur stor rutan ska vara i rutnätet, som andel av rutnätets bredd (0–1].
   * Ex: 0.5 = halva bredden, 0.25 = en fjärdedel.
   * Utelämnas → rutan tar en (1) kolumn, dvs. minsta storleken.
   */
  scale?: number;
  /**
   * Rutans typ. 'image' (default) = foto. 'logo-to' / 'logo-tes' = de två
   * logotyp-delarna ("TO" respektive "TES", som i hero-sektionen) som flyter på
   * den mörka bakgrunden och inte öppnas i lightbox. För logo-typerna behövs
   * ingen `src`.
   */
  kind?: 'image' | 'logo-to' | 'logo-tes';
};
