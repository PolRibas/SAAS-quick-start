import { useState, useEffect } from 'react';

export const useSize = () => {
  const [size, setSize] = useState<number>(1000);

  const checkSize = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setSize(width);
    } else if (width < 992) {
      setSize(width);
    } else {
      setSize(width);
    }
  };

  useEffect(() => {
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return {
    isMobile: size < 768,
    isTablet: size >= 768 && size < 992,
    isDesktop: size >= 992,
    windowSize: size
  };
};
