import { Link } from '../../ui/Link';
import { Modal } from '../../ui/Modal';
import type { SlideProps } from '../../ui/Slide';
import { Slide } from '../../ui/Slide';
import { Typography } from '../../ui/Typography';

const Tag = (): JSX.Element => (
  <div>
    <img
      src="/tag-feature.png"
      alt="タグ機能の画像"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.H4>タグ機能が復活</Typography.H4>
      <Typography.Paragraph>
        一時的に廃止されていたタグ機能が再開し、タイムテーブルの上部に表示されるようになりました！
      </Typography.Paragraph>
    </Modal.Body>
  </div>
);

const Recommendation = (): JSX.Element => (
  <div>
    <img
      /* cspell:disable-next-line */
      src="/mochimochi.jpg"
      alt="inflictionのもちもちコラボのスクリーンショット"
      className="bg-primary-500 object-contain w-full h-36 md:h-80"
    />

    <Modal.Body>
      <Typography.H4>開発者が最近の見たおすすめの配信</Typography.H4>
      <Typography.Paragraph>
        <Link href="https://youtu.be/U837mYKhotM" target="_blank">
          あした...明日、剣持ひまぁ？♡ ←ここすき
        </Link>
      </Typography.Paragraph>
    </Modal.Body>
  </div>
);

export default (props: Omit<SlideProps, 'pages' | 'title'>): JSX.Element => {
  return <Slide title="更新情報" pages={[Tag, Recommendation]} {...props} />;
};
