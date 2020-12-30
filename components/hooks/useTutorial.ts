import { useLocalStorage } from 'react-use';

export interface UseTutorialResponse {
  readonly hasTutorialDone: boolean;
  setTutorialStatus: (status: boolean) => void;
}

export const useTutorial = (): UseTutorialResponse => {
  const [hasTutorialDone, setTutorialStatus] = useLocalStorage(
    'has-got-started',
    false,
  );

  if (hasTutorialDone == null) {
    throw new Error('useLocalStorage returned nullish');
  }

  return { hasTutorialDone, setTutorialStatus };
};
