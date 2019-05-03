import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { withTheme } from 'client/ui/test-utils';
import { EventCard } from '../event-card';

const event = {
  id: 1069,
  name: "神ゲーらしい【The Beginner's Guide】",
  description:
    'にじさんじ所属バーチャルライバー剣持刀也 防御力：ちくわの700倍 【Twitter】https://twitter.com/rei_Toya_rei',
  public: 1,
  url: 'https://www.youtube.com/watch?v=nm5VvO9Z4gY',
  start_date: '2019-02-28T00:00:00.000+09:00',
  end_date: '2019-02-28T01:00:00.000+09:00',
  recommend: false,
  liver: {
    id: 23,
    name: '剣持刀也',
    avatar:
      'https://s3-ap-northeast-1.amazonaws.com/liver-icons/400x400/Kenmochi_Touya.png',
    color: '#a590af',
  },
};

describe('<EventCard />', () => {
  afterEach(cleanup);

  it('renders event card with given props', () => {
    const Compoennt = withTheme(EventCard);
    const result = render(<Compoennt event={event} />);

    expect(result.container.firstChild).toMatchSnapshot();
  });
});
