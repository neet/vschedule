import { useRef, useState } from 'react';

import { Button } from '../../ui/Button';
import { Tutorial } from '../Tutorial';

export const TutorialButton = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleClose = (): void => {
    setOpen(false);
    ref.current?.focus();
  };

  return (
    <>
      {isOpen && <Tutorial show onHide={handleClose} />}

      <Button ref={ref} onClick={(): void => void setOpen(true)}>
        チュートリアル
      </Button>
    </>
  );
};
