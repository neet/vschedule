import { useTutorial } from '../../hooks/useTutorial';
import { Button } from '../../ui/Button';

export const TutorialButton = (): JSX.Element => {
  const { setTutorialStatus } = useTutorial();

  return (
    <Button
      onClick={(): void => {
        setTutorialStatus(false);
        location.href = '/';
      }}
    >
      チュートリアル
    </Button>
  );
};
