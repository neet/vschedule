import classNames from 'classnames';

import { Typography } from '../Typography';

export const Empty = (): JSX.Element => {
  return (
    <div
      className={classNames(
        'w-full',
        'h-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
      )}
    >
      <img
        src="/undraw_empty_xct9.svg"
        alt="空の段ボールを持って立ち尽くす人"
        className="block w-full md:max-w-sm mx-auto my-8"
      />
      <Typography.Paragraph className={classNames('text-center')}>
        そのような配信は見つかりませんでした、別のキーワードをお試しください。
      </Typography.Paragraph>
    </div>
  );
};
