import { H } from 'react-headings';

import { Link } from '../../ui/Link';
import { Modal } from '../../ui/Modal';
import type { SlideProps } from '../../ui/Slide';
import { Slide } from '../../ui/Slide';
import { Typography } from '../../ui/Typography';

const DarkMode = (): JSX.Element => (
  <div>
    <img
      src="/dark-mode.png"
      alt="ダークモードの画像"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>ダークモードに対応</Typography.Xl>
      <Typography.Base>
        デバイスの設定に応じてダークモードが表示されるようになりました！
      </Typography.Base>
    </Modal.Body>
  </div>
);

const DeltaSwapping = (): JSX.Element => (
  <div>
    <img
      src="/track-pad.png"
      alt="トラックパッドを触る手の写真"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>ホイールでの横スクロールに対応</Typography.Xl>
      <Typography.Base>
        フィードバックが多かったマウスホイールでの横スクロール（X軸の回転）に対応しました。
        <Link href="/user">設定画面</Link>からオプションで有効化できます
      </Typography.Base>
    </Modal.Body>
  </div>
);

const VideoPreview = (): JSX.Element => (
  <div>
    <img
      src="/preview.png"
      alt="プレビューの画像"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>プレビュー機能（PC限定）</Typography.Xl>
      <Typography.Base>
        配信アイコンにフォーカスまたはマウスを置くと動画詳細とYouTubeのプレビューが表示されるようになりました！
      </Typography.Base>
    </Modal.Body>
  </div>
);

const Tech = (): JSX.Element => (
  <div>
    <img
      src="/performance.png"
      alt="Chromeのデバッガーのスクリーンショット"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>技術的な更新</Typography.Xl>
      <Typography.Base>
        SSR基盤をNext.jsでリプレイスしVercelでサーバーレス化、Tailwind
        CSSによるデザインシステム改修、アクセシビリティーの強化に取り組みました！これまで以上に低コスト高パフォーマンスで動作します。
      </Typography.Base>
    </Modal.Body>
  </div>
);

const Feedback = (): JSX.Element => (
  <div>
    <img
      src="/agenda.png"
      alt="いつから.linkとリファインドいつから.linkを並べた画像"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>フィードバック先</Typography.Xl>
      <Typography.Base>
        質問や機能のリクエスト、改善点、バグの報告はフィードバック用の
        <Link href="https://forms.gle/1tg2n5KB9fcroJcc7" target="_blank">
          問い合わせフォーム
        </Link>
        か、
        <Link href="https://github.com/neet/refined-itsukara-link">GitHub</Link>
        までお寄せください！
        このプロジェクトはオープンソースソフトウェアで、より良い実装をしていただけるコントリビューターも募集しています！
      </Typography.Base>
    </Modal.Body>
  </div>
);
//

const Recommendation = (): JSX.Element => (
  <div>
    <img
      /* cspell:disable-next-line */
      src="/menuki-dori.png"
      alt="目抜き通り"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.Xl as={H}>開発者が最近の見たおすすめの配信</Typography.Xl>
      <Typography.Base>
        <Link href="https://youtu.be/A6jnAB4c7xQ" target="_blank">
          力一とわらわめっちゃいい声じゃん...
        </Link>
      </Typography.Base>
    </Modal.Body>
  </div>
);

const Updates = (props: Omit<SlideProps, 'pages' | 'title'>): JSX.Element => {
  return (
    <Slide
      title="更新情報"
      pages={[
        DarkMode,
        DeltaSwapping,
        VideoPreview,
        Tech,
        Feedback,
        Recommendation,
      ]}
      {...props}
    />
  );
};
export default Updates;
