import { useLocalStorage } from 'react-use';

export interface UseAutoplayResponse {
  readonly autoplayEnabled: boolean;
  setAutoplay: (status: boolean) => void;
}

export const useAutoplay = (): UseAutoplayResponse => {
  const [autoplayEnabled, setAutoplay] = useLocalStorage(
    'autoplay-enabled',
    typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  if (autoplayEnabled == null) {
    throw new Error('useLocalStorage returned nullish');
  }

  return { autoplayEnabled, setAutoplay };
};
