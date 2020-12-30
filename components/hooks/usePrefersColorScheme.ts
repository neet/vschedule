import { useEffect, useState } from 'react';

export const usePrefersColorScheme = (): boolean => {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const [isDark, setIsDark] = useState<boolean>(query.matches);

  useEffect(() => {
    query.addEventListener('change', (e) => {
      setIsDark(e.matches);
    });
  }, [query]);

  return isDark;
};
