import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import type { Meta } from '@storybook/react';

import { Button } from '../Button';
import { Modal } from './Modal';

export default {
  component: Modal,
} as Meta;

export const Default = {
  render: (): JSX.Element => (
    <Modal.Window>
      <Modal.Title {...actions('onClose')}>
        {text('title', 'Modal')}
      </Modal.Title>

      <Modal.Body>{text('body', 'Lorem ipsum')}</Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal.Window>
  ),
};
