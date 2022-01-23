import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Badge } from '../Badge';
import { Typography } from '../Typography';

export type EntryVariant = 'flat' | 'shade';
type EmbedType = 'always' | 'interaction' | 'never';
export type EntryLayout = 'horizontal' | 'vertical';

interface BaseEntryProps {
  readonly layout: EntryLayout;
  readonly variant: EntryVariant;
}

const thumbnailClass = (layout: EntryLayout): string =>
  classNames(
    layout === 'horizontal' && 'w-40',
    'rounded',
    'aspect-w-16',
    'aspect-h-9',
    'bg-gray-200',
    'dark:bg-neutral-800',
    'overflow-hidden',
  );

interface LoadingEntryProps extends BaseEntryProps {
  readonly loading: true;
}

const LoadingEntry = (props: LoadingEntryProps): JSX.Element => {
  const { layout } = props;

  return (
    <div
      className={classNames(
        'animate-pulse',
        layout === 'horizontal' && ['flex', 'space-x-4', 'items-center'],
      )}
    >
      <div className="grow-0 shrink-0">
        <div className={thumbnailClass(layout)} />
      </div>

      <div className="flex-1">
        <div className="h-5 w-2/3 my-1 bg-gray-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-full mb-1 bg-gray-200 dark:bg-neutral-800 rounded" />
        <div className="h-3 w-full mb-1 bg-gray-200 dark:bg-neutral-800 rounded" />
      </div>
    </div>
  );
};

type ReadyEntryProps = BaseEntryProps &
  Readonly<JSX.IntrinsicElements['a']> & {
    readonly title: string;
    readonly url: string;
    readonly author: string;
    readonly thumbnail: string;
    readonly description: string;
    readonly thumbnailAlt: string;
    readonly date: Readonly<Date>;
    readonly active: boolean;
    readonly tag?: string;
    readonly embed?: ReactNode;
    readonly embedType?: EmbedType;
    readonly loading: false;
    readonly pinned: boolean;
  };

const ReadyEntry = (props: ReadyEntryProps): JSX.Element => {
  const {
    variant,
    layout,
    url,
    thumbnail,
    thumbnailAlt,
    active,
    title,
    author,
    tag,
    description,
    embed,
    embedType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loading,
    pinned,
    date,
    className,
    ...rest
  } = props;

  const formattedDate = dayjs(date.toISOString());
  const [interacting, setInteraction] = useState(false);

  const showEmbed =
    embed != null &&
    ((embedType === 'interaction' && interacting) || embedType === 'always');

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      onMouseOver={() => void setInteraction(true)}
      onMouseLeave={() => void setInteraction(false)}
      onFocus={() => void setInteraction(true)}
      onBlur={() => void setInteraction(false)}
      className={classNames(
        'group',
        layout === 'horizontal' && ['flex', 'space-x-4', 'items-center'],
        layout === 'vertical' && 'space-y-2',
        className,
      )}
      {...rest}
    >
      <div className="relative">
        <div
          className={classNames(
            thumbnailClass(layout),
            variant === 'shade' && 'shadow border dark:border-neutral-700',
            variant === 'flat' &&
              'border border-gray-200 dark:border-neutral-700',
          )}
        >
          {showEmbed ? (
            embed
          ) : (
            <Image
              loading="lazy"
              layout="fill"
              objectFit="cover"
              src={thumbnail}
              alt={thumbnailAlt}
            />
          )}
        </div>

        {active && (
          <div className="absolute top-2 right-2">
            <Badge variant="ping">配信中</Badge>
          </div>
        )}

        {!active && pinned && (
          <div className="absolute top-2 right-2">
            <Badge>注目の配信</Badge>
          </div>
        )}
      </div>

      <div className={'space-y-1'}>
        <Typography
          as="h4"
          weight="semibold"
          className={classNames(
            'group-hover:text-primary-600',
            'dark:group-hover:text-primary-400',
            'ease-out',
            'transition-colors',
            'line-clamp-2',
          )}
        >
          {title}
        </Typography>

        <Typography as="p" variant="wash" className="line-clamp-2 break-all">
          {description}
        </Typography>

        <Typography
          as="dl"
          size="sm"
          variant="wash"
          className={classNames('flex')}
        >
          <dt className="sr-only">ライバー</dt>
          <dd className="mr-2">{author}</dd>

          <span aria-hidden className="mr-2">
            •
          </span>

          <dt className="sr-only">開始時刻</dt>
          <dd className="mr-2">
            <time dateTime={formattedDate.toISOString()}>
              {dayjs(formattedDate).fromNow()}
            </time>
          </dd>

          {tag != null && (
            <>
              <span aria-hidden className="mr-2">
                •
              </span>
              <dt className="sr-only">タグ</dt>
              <dd className="mr-2">{tag}</dd>
            </>
          )}
        </Typography>
      </div>
    </a>
  );
};

export type EntryProps = LoadingEntryProps | ReadyEntryProps;

export const Entry = (props: EntryProps): JSX.Element => {
  if (props.loading) {
    return <LoadingEntry {...props} />;
  }

  return <ReadyEntry {...props} />;
};

Entry.defaultProps = {
  loading: false,
  variant: 'shade',
  embed: null,
  embedType: 'interaction',
  pinned: false,
  layout: 'vertical',
};
