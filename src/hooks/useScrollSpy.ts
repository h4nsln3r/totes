import { useEffect, useState } from 'react';

const useScrollSpy = (ids: string[], offset = 150): string => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + offset;
      const firstSection = document.getElementById(ids[0]);

      if (firstSection && scrollPos < firstSection.offsetTop) {
        setActiveId('');
        return;
      }

      const current = ids.find((id) => {
        const el = document.getElementById(id);
        return el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos;
      });

      if (current) setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;
