import { text } from '@storybook/addon-knobs';
import { Button } from '../Button';
import { Modal } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
};

export const Default = (): JSX.Element => {
  return (
    <Modal.Window>
      <Modal.Title>{text('title', 'Modal')}</Modal.Title>
      <Modal.Body>{text('title', 'Lorem ipsum')}</Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal.Window>
  );
};
