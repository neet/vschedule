/* eslint-disable @typescript-eslint/naming-convention */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import type { Event } from '../../../types';
import { EventMarker } from './EventMarker';

const FIXTURE: Event = {
  id: 123,
  name: 'イベント名',
  description: '説明',
  public: 0,
  url: 'https://example.com',
  thumbnail: 'https://example.com/img',
  recommend: false,
  start_date: '2020-12-29T16:33:34.666Z',
  end_date: '2020-12-29T16:40:34.666Z',
  livers: [
    {
      id: 1,
      name: 'ライバー名',
      avatar: 'https://example.com/img',
      color: '#ffffff',
    },
  ],
};

describe('EventMarker', () => {
  beforeAll(() => {
    mockAllIsIntersecting(false);
  });

  it('shows card on hover', async () => {
    render(<EventMarker event={FIXTURE} />);

    // "開始時刻" はカードでしか見えない
    fireEvent.focus(screen.getByTitle('イベント名'));
    expect(screen.getByText('in 2 years')).toBeVisible();

    fireEvent.blur(screen.getByTitle('イベント名'));

    await waitFor(() => {
      expect(screen.queryByText('in 2 years')).toBeNull();
    });
  });
});
