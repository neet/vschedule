import { Keyboard } from '../../ui/Keyboard';
import { Modal } from '../../ui/Modal';
import type { SlideProps } from '../../ui/Slide';
import { Slide } from '../../ui/Slide';
import { Typography } from '../../ui/Typography';

const Tag = (): JSX.Element => (
  <div>
    <img
      src="/search-feature.png"
      alt="検索機能の画像"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.H4>検索機能を実装</Typography.H4>
      <Typography.Paragraph>
        タイムテーブル上に表示されている予定を横断で検索できる検索機能を実装しました。サイドバーの検索フォームをクリックするか、{' '}
        <Keyboard>Ctrl+K</Keyboard> キーで表示できます。
      </Typography.Paragraph>
    </Modal.Body>
  </div>
);

const Updates = (props: Omit<SlideProps, 'pages' | 'title'>): JSX.Element => {
  return <Slide title="更新情報" pages={[Tag]} {...props} />;
};

export default Updates;
