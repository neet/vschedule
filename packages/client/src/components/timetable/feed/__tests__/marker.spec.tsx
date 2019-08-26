import dayjs from 'dayjs';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { withTheme } from '../../../../test-utils';
import { Marker } from '../marker';
import { PartialContentFieldsFragment } from '../../../../generated/graphql';

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
  sources: [
    {
      id: '23',
      name: '剣持刀也',
      avatar:
        'https://s3-ap-northeast-1.amazonaws.com/liver-icons/400x400/Kenmochi_Touya.png',
      color: '#a590af',
    },
  ],
};

describe('<Marker />', () => {
  afterEach(cleanup);

  it('renders marker with given props', () => {
    const Component = withTheme(Marker);
    const result = render(
      <Component
        content={(content as any) as PartialContentFieldsFragment}
        row={0}
        startDate={dayjs('2019-02-28T00:00:00.000+09:00')}
      />,
    );

    expect(result.container.firstChild).toMatchSnapshot();
  });
});
