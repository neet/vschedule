import classNames from 'classnames';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { createElement, useState } from 'react';
import { useTutorial } from '../../hooks/useTutorial';

const Page1 = () => {
  return (
    <div role="group" aria-labelledby="tutorial__page-1">
      <Modal.Title>
        <a id="tutorial__page-1" href="#">
          さあ、始めよう！
        </a>
      </Modal.Title>

      <img
        src="/screenshot.png"
        alt="スクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body>
        <p>
          Refined
          Itsukara.linkへようこそ！このwebサイトはバーチャルユーチューバー事務所「にじさんじ」が提供する公式スケジューラー「いつから.link」をファンが非公式にリデザインしたものです。これから使い方をご説明します！
        </p>
      </Modal.Body>
    </div>
  );
};

const Page2 = () => {
  return (
    <div role="group" aria-labelledby="tutorial__page-2">
      <Modal.Title id="tutorial__page-2" className="text-lg font-semibold">
        <a href="#tutorial__page-2">配信をチェック</a>
      </Modal.Title>

      <img
        src="/timetable.png"
        alt="タイムテーブルのスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body>
        <p>
          画面中央に表示されるのは過去の配信と、これから始まる配信です、各配信をタップするとYouTubeの配信画面が表示されます。左右にスクロールすると（パソコンをお使いの場合は
          <kbd>Shift</kbd>
          を押しながらホイールを回転）時間を前後に移動させることが出来ます。
        </p>
      </Modal.Body>
    </div>
  );
};

const Page3 = () => {
  return (
    <div role="group" aria-labelledby="tutorial__page-3">
      <Modal.Title id="tutorial__page-3" className="text-lg font-semibold">
        <a href="#tutorial__page-3">ライバー</a>
      </Modal.Title>

      <img
        src="/livers.png"
        alt="ライバーの一覧のスクリーンショット"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body>
        <p>
          サイドバーやメニューからアクセスできるライバーの項目からは、現在配信中のライバーやライバーの一覧を表示することができます。
        </p>
      </Modal.Body>
    </div>
  );
};

const Page4 = () => {
  return (
    <div role="group" aria-labelledby="tutorial__page-4">
      <Modal.Title id="tutorial__page-4" className="text-lg font-semibold">
        <a href="#tutorial__page-4">アクセシビリティー</a>
      </Modal.Title>

      <img
        src="/a11y.png"
        alt="丸と人の図形、アクセシビリティー"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body>
        <p>
          Refined Itsukara.linkはVoiceOverとキーボードでテストされており、WCAG
          2.1
          AAの準拠を基準としています。アクセシビリティーに関するフィードバックをお持ちの方は開発者までご連絡ください。
        </p>
      </Modal.Body>
    </div>
  );
};

const Page5 = () => {
  return (
    <div role="group" aria-labelledby="tutorial__page-5">
      <Modal.Title id="tutorial__page-5" className="text-lg font-semibold">
        <a href="#tutorial__page-5">開発に参加</a>
      </Modal.Title>

      <img
        src="/agenda.png"
        alt="いつから.linkとリファインドいつから.linkを並べた画像"
        className="bg-primary-500 object-contain w-full h-36 md:h-80"
      />

      <Modal.Body>
        <p>
          使い方はお分かりいただけましたか？
          質問や機能のリクエスト、改善点、バグの報告は Twitter（
          <a href="https://twitter.com/TheGodOfNeet">@TheGodOfNeet</a>）
          か、GitHub（
          <a href="https://github.com/neet/refined-itusukara-link">
            neet/refined-itsukara-link
          </a>
          ） までお寄せください！
          このプロジェクトはオープンソースソフトウェアで、より良い実装をしていただけるコントリビューターも募集しています！
          それではお楽しみください！
        </p>
      </Modal.Body>
    </div>
  );
};

export const Tutorial = (): JSX.Element => {
  const pages = [Page1, Page2, Page3, Page4, Page5];

  const { hasTutorialDone, setTutorialStatus } = useTutorial();
  const [pageNum, setPageNum] = useState(0);

  const handleClickNext = () => {
    setPageNum(pageNum + 1);
  };

  const handleClickPrevious = () => {
    setPageNum(pageNum - 1);
  };

  const handleComplete = () => {
    setTutorialStatus(true);
  };

  return (
    <Modal
      show={!hasTutorialDone}
      title="チュートリアル"
      onHide={handleComplete}
      root={document.body}
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
