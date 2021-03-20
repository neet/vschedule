import Head from 'next/head';
import { useLocalStorage } from 'react-use';

import { useAutoplay } from '../components/hooks/useAutoplay';
import { Switch } from '../components/ui/Switch';
import { Typography } from '../components/ui/Typography';
import Article from '../layouts/Article';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSwapDelta = () => {
  const [swapDelta, setSwapDelta] = useLocalStorage('swap-delta', false);
  if (swapDelta == null) throw new Error();
  return { swapDelta, setSwapDelta };
};

const User = (): JSX.Element => {
  const { swapDelta, setSwapDelta } = useSwapDelta();
  const { autoplayEnabled, setAutoplay } = useAutoplay();

  return (
    <>
      <Head>
        <title>にじさんじのライバー一覧 | Refined Itsukara.link</title>
        <meta
          name="description"
          content="にじさんじに所属するバーチャルライバーの一覧です。"
        />
      </Head>

      <Typography.H1>設定</Typography.H1>

      <div className="flex space-x-5 items-center">
        <div className="flex-grow">
          <Typography.H4>ホイールで横スクロール（実験中）</Typography.H4>
          <Typography.Paragraph>
            タイムテーブル上のマウスホイールのX軸とY軸を入れ替え、Shiftを押さなくても横スクロールが行えるようになります。
            トラックパッドをお使いの場合は無効にすることをお勧めします。
          </Typography.Paragraph>
        </div>

        <Switch
          value={swapDelta}
          className="flex-shrink-0 mt-2"
          onChange={setSwapDelta}
          aria-label={swapDelta ? '無効化する' : '有効化する'}
        />
      </div>

      <div className="flex space-x-5 items-center">
        <div className="flex-grow">
          <Typography.H4>自動再生</Typography.H4>
          <Typography.Paragraph>
            YouTubeの埋め込み動画などをホバーした際の自動再生を有効化します。
          </Typography.Paragraph>
        </div>

        <Switch
          value={autoplayEnabled}
          className="flex-shrink-0 mt-2"
          onChange={setAutoplay}
          aria-label={autoplayEnabled ? '無効化する' : '有効化する'}
        />
      </div>
    </>
  );
};

User.Layout = Article;

export default User;
