import { useTutorial } from '../../hooks/useTutorial';
import { Link } from '../../ui/Link';
import { Modal } from '../../ui/Modal';
import { Slide } from '../../ui/Slide';
import { Typography } from '../../ui/Typography';

const Page1 = (): JSX.Element => {
  return (
    <div
      role="group"
      aria-labelledby="tutorial-1__title"
      aria-describedby="tutorial-1__description"
    >
      <img
        src="/screenshot.png"
        alt="スクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-1__description">
        <Typography.H4>さあ、始めよう！</Typography.H4>
        <Typography.Paragraph>
          Refined
          Itsukara.linkへようこそ！このwebサイトはバーチャルユーチューバー事務所「にじさんじ」が提供する公式スケジューラー「いつから.link」をファンが非公式にリデザインしたものです。これから使い方をご説明します！
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page2 = (): JSX.Element => {
  return (
    <div
      role="group"
      aria-labelledby="tutorial-2__title"
      aria-describedby="tutorial-2__description"
    >
      <img
        src="/timetable.png"
        alt="タイムテーブルのスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-2__description">
        <Typography.H4>配信をチェック</Typography.H4>
        <Typography.Paragraph>
          画面中央に表示されるのは過去の配信と、これから始まる配信です、各配信をタップするとYouTubeの配信画面が表示されます。左右にスクロールすると時間を前後に移動させることが出来ます。
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page3 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-3__description">
      <img
        src="/livers.png"
        alt="ライバーの一覧のスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-3__description">
        <Typography.H4>ライバー</Typography.H4>
        <Typography.Paragraph>
          サイドバーやメニューからアクセスできるライバーの項目からは、現在配信中のライバーやライバーの一覧を表示することができます。
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page4 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-4__description">
      <img
        src="/a11y.png"
        alt="丸と人の図形、アクセシビリティー"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-4__description">
        <Typography.H4>アクセシビリティー</Typography.H4>
        <Typography.Paragraph>
          Refined Itsukara.linkはVoiceOverとキーボードでテストされており、WCAG
          2.1
          AAの準拠を基準としています。アクセシビリティーに関するフィードバックをお持ちの方は開発者までご連絡ください。
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page5 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-5__description">
      <img
        src="/agenda.png"
        alt="いつから.linkとリファインドいつから.linkを並べた画像"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-5__description">
        <Typography.H4>開発に参加</Typography.H4>
        <Typography.Paragraph>
          使い方はお分かりいただけましたか？
          質問や機能のリクエスト、改善点、バグの報告はフィードバック用の
          <Link href="https://forms.gle/1tg2n5KB9fcroJcc7" target="_blank">
            問い合わせフォーム
          </Link>
          か、
          <Link href="https://github.com/neet/refined-itsukara-link">
            GitHub
          </Link>
          までお寄せください！
          このプロジェクトはオープンソースソフトウェアで、より良い実装をしていただけるコントリビューターも募集しています！
          それではお楽しみください！
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

export interface TutorialProps {
  readonly show?: boolean;
  readonly onHide?: () => void;
}

const pages = [Page1, Page2, Page3, Page4, Page5];

export const Tutorial = (props: TutorialProps): JSX.Element => {
  const { show, onHide } = props;

  const { hasTutorialDone, setTutorialStatus } = useTutorial();

  const handleComplete = (): void => {
    setTutorialStatus(true);
    onHide?.();
    gtag('event', 'complete_tutorial');
  };

  return (
    <Slide
      title="チュートリアル"
      pages={pages}
      show={!hasTutorialDone || (show != null && show)}
      onHide={handleComplete}
    />
  );
};
