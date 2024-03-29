import Image from 'next/future/image';
import { H } from 'react-headings';

import a11y from '../../../../public/a11y.png';
import agenda from '../../../../public/agenda.png';
import livers from '../../../../public/livers.png';
import screenshot from '../../../../public/screenshot.png';
import timetable from '../../../../public/timetable.png';
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
      <div className="aspect-video relative bg-primary-500 w-full">
        <Image
          src={screenshot}
          alt="スクリーンショット"
          fill
          className="object-contain"
        />
      </div>

      <Modal.Body id="tutorial-1__description">
        <Typography.Xl as={H}>さあ、始めよう！</Typography.Xl>
        <Typography.Base className="h-20">
          Refined
          Itsukara.linkへようこそ！このwebサイトはバーチャルユーチューバー事務所「にじさんじ」が提供する公式スケジューラー「いつから.link」をファンが非公式にリデザインしたものです。これから使い方をご説明します！
        </Typography.Base>
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
      <div className="aspect-video relative bg-primary-500 w-full">
        <Image
          src={timetable}
          alt="タイムテーブルのスクリーンショット"
          fill
          className="object-contain"
        />
      </div>

      <Modal.Body id="tutorial-2__description">
        <Typography.Xl as={H}>配信をチェック</Typography.Xl>
        <Typography.Base className="h-20">
          画面中央には、過去の配信とこれから始まる配信が表示されています。各配信をタップすると
          YouTube
          の配信画面が表示されます。左右にスクロールすると時間を前後に移動させることが出来ます。
        </Typography.Base>
      </Modal.Body>
    </div>
  );
};

const Page3 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-3__description">
      <div className="aspect-video relative bg-primary-500 w-full">
        <Image
          src={livers}
          alt="ライバーの一覧のスクリーンショット"
          fill
          className="object-contain"
        />
      </div>

      <Modal.Body id="tutorial-3__description">
        <Typography.Xl as={H}>ライバー</Typography.Xl>
        <Typography.Base className="h-20">
          サイドバーやメニューからアクセスできるライバーの項目からは、現在配信中のライバーやライバーの一覧を表示することができます。
        </Typography.Base>
      </Modal.Body>
    </div>
  );
};

const Page4 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-4__description">
      <div className="aspect-video relative bg-primary-500 w-full">
        <Image
          src={a11y}
          alt="丸と人の図形、アクセシビリティー"
          fill
          className="object-contain"
        />
      </div>

      <Modal.Body id="tutorial-4__description">
        <Typography.Xl as={H}>アクセシビリティー</Typography.Xl>
        <Typography.Base className="h-20">
          Refined Itsukara.linkはVoiceOverとキーボードでテストされており、WCAG
          2.1
          AAの準拠を基準としています。アクセシビリティーに関するフィードバックをお持ちの方は開発者までご連絡ください。
        </Typography.Base>
      </Modal.Body>
    </div>
  );
};

const Page5 = (): JSX.Element => {
  return (
    <div role="group" aria-describedby="tutorial-5__description">
      <div className="aspect-video relative bg-primary-500 w-full">
        <Image
          src={agenda}
          alt="いつから.linkとリファインドいつから.linkを並べた画像"
          fill
          className="object-contain"
        />
      </div>

      <Modal.Body id="tutorial-5__description">
        <Typography.Xl as={H}>開発に参加</Typography.Xl>
        <Typography.Base className="h-20 overflow-scroll">
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
        </Typography.Base>
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
