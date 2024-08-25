import { useEffect } from 'react';

const useInfiniteScroll = (callback, options = {}) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      // Check if we have scrolled to the bottom
      if (scrollTop + clientHeight >= scrollHeight - (options.offset || 100)) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, options]);
};

export default useInfiniteScroll;
