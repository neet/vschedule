import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Slide } from './Slide';

describe('Tutorial', () => {
  beforeAll(() => {
    // App root
    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);
  });

  const A = (): JSX.Element => <div aria-label="ページ1" />;
  const B = (): JSX.Element => <div aria-label="ページ2" />;

  it('slide works', async () => {
    const onHide = jest.fn();

    const { rerender } = render(
      <Slide title="スライド" show pages={[A, B]} onHide={onHide} />,
    );

    expect(screen.getByLabelText('スライド')).toBeVisible();
    expect(screen.getByLabelText('スライド')).toHaveFocus();
    expect(screen.getByLabelText('ページ1')).toBeVisible();
    fireEvent.click(screen.getByText('次へ'));

    expect(screen.getByLabelText('ページ2')).toBeVisible();
    fireEvent.click(screen.getByText('閉じる'));
    expect(onHide).toBeCalled();

    rerender(
      <Slide title="スライド" show={false} pages={[A, B]} onHide={onHide} />,
    );

    await waitFor(() => {
      expect(screen.queryByLabelText('スライド')).toBeNull();
      expect(document.body).toHaveFocus();
    });
  });
});
