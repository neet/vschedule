/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Mousetrap from 'mousetrap';
import type { DependencyList } from 'react';
import { useCallback, useEffect } from 'react';

export type HandlerCallback = (
  e: Readonly<Mousetrap.ExtendedKeyboardEvent>,
  combo: string,
) => boolean | undefined;

export function useMousetrap(
  key: string[] | string,
  callback: HandlerCallback,
  deps: DependencyList = [],
): void {
  const handleMousetrap = useCallback(callback, [callback, ...deps]);

  useEffect(() => {
    Mousetrap.bind(key, handleMousetrap);
    return (): void => void Mousetrap.unbind(key);
  }, [key, handleMousetrap]);
}
