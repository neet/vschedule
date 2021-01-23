import type { NextPage } from 'next';
import { useLocalStorage } from 'react-use';

import { Layout } from '../components/app/Layout';
import { useAutoplay } from '../components/hooks/useAutoplay';
import { Switch } from '../components/ui/Switch';
import { Typography } from '../components/ui/Typography';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSwapDelta = () => {
  const [swapDelta, setSwapDelta] = useLocalStorage('swap-delta', false);
  if (swapDelta == null) throw new Error();
  return { swapDelta, setSwapDelta };
};

const User: NextPage = () => {
  const { swapDelta, setSwapDelta } = useSwapDelta();
  const { autoplayEnabled, setAutoplay } = useAutoplay();

  return (
    <Layout
      variant="article"
      title="設定 | Refined Itsukara.link"
      description="ユーザー設定を行います"
    >
      <Typography.H1>設定</Typography.H1>

      <div className="flex space-x-5">
        <Typography.H4>ホイールで横スクロール（実験中）</Typography.H4>
        <Switch
          value={swapDelta}
          onChange={setSwapDelta}
          aria-label={swapDelta ? '無効化する' : '有効化する'}
        />
      </div>

      <Typography.Paragraph>
        タイムテーブル上のマウスホイールのX軸とY軸を入れ替え、Shiftを押さなくても横スクロールが行えるようになります。
        トラックパッドをお使いの場合は無効にすることをお勧めします。
      </Typography.Paragraph>

      <div className="flex space-x-5">
        <Typography.H4>自動再生</Typography.H4>
        <Switch
          value={autoplayEnabled}
          onChange={setAutoplay}
          aria-label={autoplayEnabled ? '無効化する' : '有効化する'}
        />
      </div>

      <Typography.Paragraph>
        YouTubeの埋め込み動画などをホバーした際の自動再生を有効化します。
      </Typography.Paragraph>
    </Layout>
  );
};

export default User;
