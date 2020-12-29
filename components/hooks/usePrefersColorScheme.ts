import darkmodejs from '@assortment/darkmodejs';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'no-preference' | 'no-support';

export const usePrefersColorScheme = (): Theme | undefined => {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    const res = darkmodejs({
      onChange(active: Theme): void {
        setTheme(active);
      },
    });

    return res.removeListeners;
  });

  return theme;
};
