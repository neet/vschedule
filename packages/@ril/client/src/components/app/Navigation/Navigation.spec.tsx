import { fireEvent, render, screen } from '@testing-library/react';

import { Navigation } from './Navigation';

describe('Navigation', () => {
  beforeAll(() => {
    // App root
    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    document.body.appendChild(app);
  });

  it('mobile', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByTitle('メニューを開く'));
    expect(screen.getByLabelText('ナビゲーション')).toBeVisible();

    // JSDOM cannot assert that DOM with `hidden` class is `display: none`
    // expect(screen.getByLabelText('主要なページ')).toBeVisible();
  });
});
