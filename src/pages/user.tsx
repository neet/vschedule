import type { NextPage } from 'next';
import { useLocalStorage } from 'react-use';

import { Layout } from '../components/app/Layout';
import { Switch } from '../components/ui/Switch';
import { Typography } from '../components/ui/Typography';

const User: NextPage = () => {
  const [value, setValue] = useLocalStorage('swap-delta', false);

  const handleChange = (latest: boolean): void => {
    setValue(latest);
  };

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
          value={value ?? false}
          onChange={handleChange}
          aria-label={value != null && value ? '無効化する' : '有効化する'}
        />
      </div>

      <Typography.Paragraph>
        タイムテーブル上のマウスホイールのX軸とY軸を入れ替え、Shiftを押さなくても横スクロールが行えるようになります。
        トラックパッドをお使いの場合は無効にすることをお勧めします。
      </Typography.Paragraph>
    </Layout>
  );
};

export default User;
