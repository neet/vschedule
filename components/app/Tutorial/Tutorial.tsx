import classNames from 'classnames';
import { createElement, useState } from 'react';

import { useTutorial } from '../../hooks/useTutorial';
import { Button } from '../../ui/Button';
import { Link } from '../../ui/Link';
import { Modal } from '../../ui/Modal';
import { Typography } from '../../ui/Typography';

const Page1 = (): JSX.Element => {
  return (
    <div
      role="group"
      aria-labelledby="tutorial-1__title"
      aria-describedby="tutorial-1__description"
    >
      <Modal.Title id="tutorial-1__title">
        <a href="#tutorial-1__title">さあ、始めよう！</a>
      </Modal.Title>

      <img
        src="/screenshot.png"
        alt="スクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-1__description">
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
      <Modal.Title id="tutorial-2__title">
        <a href="#tutorial-2__title">配信をチェック</a>
      </Modal.Title>

      <img
        src="/timetable.png"
        alt="タイムテーブルのスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-2__description">
        <Typography.Paragraph>
          画面中央に表示されるのは過去の配信と、これから始まる配信です、各配信をタップするとYouTubeの配信画面が表示されます。左右にスクロールすると（パソコンをお使いの場合は
          <kbd>Shift</kbd>
          を押しながらホイールを回転）時間を前後に移動させることが出来ます。
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page3 = (): JSX.Element => {
  return (
    <div
      role="group"
      aria-labelledby="tutorial-3__title"
      aria-describedby="tutorial-3__description"
    >
      <Modal.Title id="tutorial-3__title">
        <a href="#tutorial-3__title">ライバー</a>
      </Modal.Title>

      <img
        src="/livers.png"
        alt="ライバーの一覧のスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-3__description">
        <Typography.Paragraph>
          サイドバーやメニューからアクセスできるライバーの項目からは、現在配信中のライバーやライバーの一覧を表示することができます。
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

const Page4 = (): JSX.Element => {
  return (
    <div
      role="group"
      aria-labelledby="tutorial-4__title"
      aria-describedby="tutorial-4__description"
    >
      <Modal.Title id="tutorial-4__title">
        <a href="#tutorial-4__title">アクセシビリティー</a>
      </Modal.Title>

      <img
        src="/a11y.png"
        alt="丸と人の図形、アクセシビリティー"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-4__description">
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
    <div
      role="group"
      aria-labelledby="tutorial-5__title"
      aria-describedby="tutorial-5__description"
    >
      <Modal.Title id="tutorial-5__title">
        <a href="#tutorial-5__title">開発に参加</a>
      </Modal.Title>

      <img
        src="/agenda.png"
        alt="いつから.linkとリファインドいつから.linkを並べた画像"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body id="tutorial-5__description">
        <Typography.Paragraph>
          使い方はお分かりいただけましたか？
          質問や機能のリクエスト、改善点、バグの報告は Twitter（
          <Link href="https://twitter.com/TheGodOfNeet">@TheGodOfNeet</Link>）
          か、GitHub（
          <Link href="https://github.com/neet/refined-itsukara-link">
            neet/refined-itsukara-link
          </Link>
          ） までお寄せください！
          このプロジェクトはオープンソースソフトウェアで、より良い実装をしていただけるコントリビューターも募集しています！
          それではお楽しみください！
        </Typography.Paragraph>
      </Modal.Body>
    </div>
  );
};

export const Tutorial = (): JSX.Element => {
  const pages = [Page1, Page2, Page3, Page4, Page5];

  const { hasTutorialDone, setTutorialStatus } = useTutorial();
  const [pageNum, setPageNum] = useState(0);

  const handleClickNext = (): void => {
    setPageNum(pageNum + 1);
  };

  const handleClickPrevious = (): void => {
    setPageNum(pageNum - 1);
  };

  const handleComplete = (): void => {
    setTutorialStatus(true);
  };

  return (
    <Modal
      show={!hasTutorialDone}
      title="チュートリアル"
      onHide={handleComplete}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      root={document.getElementById('app')!}
    >
      <Modal.Window
        aria-live="polite"
        aria-label={`${pages.length}件中${pageNum + 1}件目`}
        aria-roledescription="スライド"
      >
        {createElement(pages[pageNum])}

        <Modal.Footer>
          <span
            className={classNames(
              'text-sm',
              'text-coolGray-700',
              'dark:text-trueGray-300',
              'tabular-nums',
            )}
            aria-hidden // page number will be announced by the label above
          >
            {pageNum + 1} / {pages.length}
          </span>

          <div className="space-x-2">
            {pageNum + 1 !== 1 && (
              <Button variant="wash" onClick={handleClickPrevious}>
                前へ
              </Button>
            )}

            {pageNum + 1 === pages.length ? (
              <Button onClick={handleComplete}>閉じる</Button>
            ) : (
              <Button onClick={handleClickNext}>次へ</Button>
            )}
          </div>
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
};
