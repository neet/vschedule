import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Tutorial } from './Tutorial';

describe('Tutorial', () => {
  beforeAll(() => {
    // App root
    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);
  });

  it('slide works', async () => {
    render(<Tutorial />);

    expect(screen.getByLabelText('チュートリアル')).toBeVisible();
    expect(screen.getByLabelText('チュートリアル')).toHaveFocus();
    expect(screen.getByLabelText('さあ、始めよう！')).toBeVisible();
    fireEvent.click(screen.getByText('次へ'));

    expect(screen.getByLabelText('配信をチェック')).toBeVisible();
    fireEvent.click(screen.getByText('次へ'));

    expect(screen.getByLabelText('ライバー')).toBeVisible();
    fireEvent.click(screen.getByText('次へ'));

    expect(screen.getByLabelText('アクセシビリティー')).toBeVisible();
    fireEvent.click(screen.getByText('次へ'));

    expect(screen.getByLabelText('開発に参加')).toBeVisible();
    fireEvent.click(screen.getByText('閉じる'));

    await waitFor(() => {
      expect(document.body).toHaveFocus();
    });
  });
});
