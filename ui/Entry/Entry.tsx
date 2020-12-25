import dayjs from 'dayjs';
import classNames from 'classnames';

export type EntryVariant = 'shade' | 'flat';

export interface EntryProps {
  readonly title: string;
  readonly url: string;
  readonly author: string;
  readonly thumbnail: string;
  readonly description: string;
  readonly thumbnailAlt: string;
  readonly date: Date;
  readonly active: boolean;
  readonly variant: EntryVariant;
  readonly tag?: string;
}

export const Entry = (props: EntryProps): JSX.Element => {
  const {
    variant,
    url,
    thumbnail,
    thumbnailAlt,
    active,
    title,
    author,
    tag,
    description,
  } = props;
  const date = dayjs(props.date);

  return (
    <a className="group" href={url} target="_blank" rel="noreferrer noopener">
      <div className="relative">
        <div className={classNames('aspect-w-16', 'aspect-h-9', 'mb-2')}>
          <img
            className={classNames(
              'rounded',
              'ease-out',
              'object-cover',
              'group-hover:opacity-75',
              'transition-opacity',
              variant === 'shade' &&
                'shadow dark:border dark:border-trueGray-600',
              variant === 'flat' &&
                'border-coolGray-200 dark:border-trueGray-800 border',
            )}
            src={thumbnail}
            alt={thumbnailAlt}
          />
        </div>

        {active && (
          <div className="absolute top-2 right-2">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-75 bg-primary-400 animate-ping rounded-full"
              role="presentation"
              aria-hidden
            />

            <div className="relative bg-primary-500 text-white px-2 py-1  rounded-full flex space-x-1 items-center shadow-sm">
              <span className="leading-none text-sm font-semibold block">
                配信中
              </span>
            </div>
          </div>
        )}
      </div>

      <div
        className={classNames('text-coolGray-600', 'dark:text-trueGray-400')}
      >
        <h4
          className={classNames(
            'font-semibold',
            'text-coolGray-700',
            'dark:text-trueGray-300',
            'group-hover:text-primary-600',
            'dark:group-hover:text-primary-400',
            'ease-out',
            'transition-colors',
            'truncate-2-lines',
          )}
        >
          {title}
        </h4>

        <dl className={classNames('flex', 'space-x-2', 'text-sm')}>
          <dt className="hidden">ライバー</dt>
          <dd>{author}</dd>

          <dt className="hidden">開始時刻</dt>
          <dd>
            <time dateTime={date.toISOString()}>{dayjs(date).fromNow()}</time>
          </dd>

          {tag && (
            <>
              <dt className="hidden">タグ</dt>
              <dd>{tag}</dd>
            </>
          )}
        </dl>

        <p className="truncate-2-lines break-all">{description}</p>
      </div>
    </a>
  );
};

Entry.defaultProps = {
  variant: 'shade',
};
