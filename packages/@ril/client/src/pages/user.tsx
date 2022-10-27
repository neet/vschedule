import Head from 'next/head';
import { H, Section } from 'react-headings';

import { useAutoplay } from '../components/hooks/useAutoplay';
import { useSwapDelta } from '../components/hooks/useSwapDelta';
import Article from '../components/layouts/Article';
import { Switch } from '../components/ui/Switch';
import { Typography } from '../components/ui/Typography';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

const User = (): JSX.Element => {
  const [swapDelta, setSwapDelta] = useSwapDelta();
  const { autoplayEnabled, setAutoplay } = useAutoplay();

  return (
    <Section component={<Typography.FourXl>設定</Typography.FourXl>}>
      <Head>
        <title>にじさんじのライバー一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじに所属するバーチャルライバーの一覧です。"
        />
      </Head>

      <div className="flex space-x-5 items-center">
        <div className="grow">
          <Typography.Xl as={H}>ホイールで横スクロール（実験中）</Typography.Xl>
          <Typography.Base>
            タイムテーブル上のマウスホイールのX軸とY軸を入れ替え、Shiftを押さなくても横スクロールが行えるようになります。
            トラックパッドをお使いの場合は無効にすることをお勧めします。
          </Typography.Base>
        </div>

        <Switch
          value={swapDelta}
          className="shrink-0 mt-2"
          onChange={setSwapDelta}
          aria-label={swapDelta ? '無効化する' : '有効化する'}
        />
      </div>

      <div className="flex space-x-5 items-center">
        <div className="grow">
          <Typography.Xl as={H}>自動再生</Typography.Xl>
          <Typography.Base>
            YouTubeの埋め込み動画などをホバーした際の自動再生を有効化します。
          </Typography.Base>
        </div>

        <Switch
          value={autoplayEnabled}
          className="shrink-0 mt-2"
          onChange={setAutoplay}
          aria-label={autoplayEnabled ? '無効化する' : '有効化する'}
        />
      </div>
    </Section>
  );
};

User.Layout = Article;

export default User;
