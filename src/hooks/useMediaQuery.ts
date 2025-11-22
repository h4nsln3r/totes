import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const getMatches = () =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);

    onChange();

    // Safari <14 fallback
    if (media.addEventListener) {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    } else {
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    }
  }, [query]);

  return matches;
}
