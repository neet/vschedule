import { useRef, useState } from 'react';

import { Button } from '../../ui/Button';
import { Tutorial } from '../Tutorial';

export const TutorialButton = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleOpen = (): void => {
    setOpen(true);
    gtag('event', 'start_tutorial_manually', {
      event_category: 'tutorial',
      event_label: 'チュートリアル',
    });
  };

  const handleClose = (): void => {
    setOpen(false);
    ref.current?.focus();
  };

  return (
    <>
      {typeof window !== 'undefined' && (
        <Tutorial show={isOpen} onHide={handleClose} />
      )}

      <Button ref={ref} onClick={handleOpen}>
        チュートリアル
      </Button>
    </>
  );
};
