import { render, screen } from '@testing-library/react';

import { Skyscraper } from './Skyscraper';

describe('Skyscraper', () => {
  it('tests labels', () => {
    render(<Skyscraper />);

    expect(screen.getByLabelText('現在時刻')).toBeVisible();
    expect(screen.getByLabelText('配信中のライバー一覧')).toBeVisible();
    expect(screen.getByLabelText('今後の配信予定')).toBeVisible();
  });
});
