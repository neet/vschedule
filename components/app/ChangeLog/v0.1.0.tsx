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
      <Typography.H4>ダークモードに対応</Typography.H4>
      <Typography.Paragraph>
        デバイスの設定に応じてダークモードが表示されるようになりました！
      </Typography.Paragraph>
    </Modal.Body>
  </div>
);

const Accessibility = (): JSX.Element => (
  <div>
    <img
      src="/a11y.png"
      alt="アクセシビリティのアイコン"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.H4>アクセシビリティ</Typography.H4>
      <Typography.Paragraph>
        キーボード及びスクリーンリーダーでのテストを行い、マークアップやフォーカスマネージメントを改善しました。
      </Typography.Paragraph>
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
      <Typography.H4>プレビュー機能（PC限定）</Typography.H4>
      <Typography.Paragraph>
        配信アイコンにフォーカスまたはマウスを置くと動画詳細とYouTubeのプレビューが表示されるようになりました！
      </Typography.Paragraph>
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
      <Typography.H4>技術的な更新</Typography.H4>
      <Typography.Paragraph>
        SSR基盤をNext.jsでリプレイスしVercelでサーバーレス化、Tailwind
        CSSによるデザインシステム改修、Intersection Observer
        APIによるパフォーマンスの改善に取り組みました！これまで以上に低コスト高パフォーマンスで動作します。
      </Typography.Paragraph>
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
      <Typography.H4>フィードバック先</Typography.H4>
      <Typography.Paragraph>
        質問や機能のリクエスト、改善点、バグの報告は Twitter（
        <Link href="https://twitter.com/TheGodOfNeet">@TheGodOfNeet</Link>）
        か、GitHub（
        <Link href="https://github.com/neet/refined-itsukara-link">
          neet/refined-itsukara-link
        </Link>
        ） までお寄せください！
        このプロジェクトはオープンソースソフトウェアで、より良い実装をしていただけるコントリビューターも募集しています！
      </Typography.Paragraph>
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
      <Typography.H4>開発者が最近の見たおすすめの配信</Typography.H4>
      <Typography.Paragraph>
        <Link href="https://youtu.be/A6jnAB4c7xQ" target="_blank">
          力一とわらわめっちゃいい声じゃん...
        </Link>
      </Typography.Paragraph>
    </Modal.Body>
  </div>
);

export default (props: Omit<SlideProps, 'pages' | 'title'>): JSX.Element => {
  return (
    <Slide
      title="更新情報"
      pages={[
        DarkMode,
        Accessibility,
        VideoPreview,
        Tech,
        Feedback,
        Recommendation,
      ]}
      {...props}
    />
  );
};
