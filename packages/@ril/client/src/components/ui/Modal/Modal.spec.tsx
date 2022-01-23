import { render, waitFor } from '@testing-library/react';

import { Modal } from './Modal';

describe('Modal', () => {
  it('focuses on modal when rendered', async () => {
    // App root
    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);

    // Modal container
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { rerender } = render(
      <Modal show title="modal" getContainer={container} getRoot={app}>
        test
      </Modal>,
    );

    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    expect(app).toHaveAttribute('aria-hidden', 'true');

    rerender(
      <Modal show={false} title="modal" getContainer={container} getRoot={app}>
        test
      </Modal>,
    );

    await waitFor(() => {
      expect(document.body).toHaveFocus();
      expect(app).not.toHaveAttribute('aria-hidden', 'true');
      expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
    });
  });
});
