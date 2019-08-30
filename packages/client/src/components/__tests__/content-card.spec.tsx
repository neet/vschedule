import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ContentCard } from 'src/components/content-card';
import { withTheme } from 'src/test-utils';
import { PartialContentFieldsFragment } from 'src/generated/graphql';

const content = {
  id: '1069',
  name: "神ゲーらしい【The Beginner's Guide】",
  description:
    'にじさんじ所属バーチャルライバー剣持刀也 防御力：ちくわの700倍 【Twitter】https://twitter.com/rei_Toya_rei',
  public: 1,
  url: 'https://www.youtube.com/watch?v=nm5VvO9Z4gY',
  startDate: '2019-02-28T00:00:00.000+09:00',
  endDate: '2019-02-28T01:00:00.000+09:00',
  recommend: false,
  streamer: [
    {
      id: 23,
      name: '剣持刀也',
      avatar:
        'https://s3-ap-northeast-1.amazonaws.com/liver-icons/400x400/Kenmochi_Touya.png',
      color: '#a590af',
    },
  ],
};

describe('<EventCard />', () => {
  afterEach(cleanup);

  it('renders event card with given props', () => {
    const Compoennt = withTheme(ContentCard);
    const result = render(
      <Compoennt content={(content as any) as PartialContentFieldsFragment} />,
    );

    expect(result.container.firstChild).toMatchSnapshot();
  });
});
