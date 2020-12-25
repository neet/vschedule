import { useLocalStorage } from 'react-use';

export interface UseTutorialResponse {
  readonly hasTutorialDone: boolean;
  setTutorialStatus(status: boolean): void;
}

export const useTutorial = (): UseTutorialResponse => {
  const [hasTutorialDone, setTutorialStatus] = useLocalStorage(
    'has-tutorial-done',
    false,
  );

  return { hasTutorialDone, setTutorialStatus };
};
