import classNames from 'classnames';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Badge } from '../Badge';
import { Typography } from '../Typography';

export type EntryVariant = 'shade' | 'flat';
type EmbedType = 'interaction' | 'never' | 'always';

interface BaseEntryProps {
  readonly variant: EntryVariant;
}

const thumbnailClass = (): string =>
  classNames(
    'mb-2',
    'rounded',
    'aspect-w-16',
    'aspect-h-9',
    'bg-coolGray-200',
    'dark:bg-trueGray-800',
    'overflow-hidden',
  );

interface LoadingEntryProps extends BaseEntryProps {
  readonly loading: true;
}

const LoadingEntry = (_props: LoadingEntryProps): JSX.Element => {
  return (
    <div className="animate-pulse">
      <div className={thumbnailClass()} />

      <div>
        <div className="h-5 w-2/3 my-1 bg-coolGray-200 dark:bg-trueGray-800 rounded" />
        <div className="h-3 w-full mb-1 bg-coolGray-200 dark:bg-trueGray-800 rounded" />
        <div className="h-3 w-full mb-1 bg-coolGray-200 dark:bg-trueGray-800 rounded" />
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
    readonly loading?: false;
  };

const ReadyEntry = (props: ReadyEntryProps): JSX.Element => {
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
    embed,
    embedType,
    ...rest
  } = props;

  const date = dayjs(props.date.toISOString());
  const [interacting, setInteraction] = useState(false);

  const showEmbed =
    embed != null &&
    ((embedType === 'interaction' && interacting) || embedType === 'always');

  return (
    <a
      className="group"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      onMouseOver={(): void => void setInteraction(true)}
      onMouseLeave={(): void => void setInteraction(false)}
      onFocus={(): void => void setInteraction(true)}
      onBlur={(): void => void setInteraction(false)}
      {...rest}
    >
      <div className="relative">
        <div
          className={classNames(
            thumbnailClass(),
            variant === 'shade' &&
              'shadow dark:border dark:border-trueGray-700',
            variant === 'flat' &&
              'border border-coolGray-200 dark:border-trueGray-700',
          )}
        >
          {showEmbed ? (
            embed
          ) : (
            <img
              loading="lazy"
              className={classNames('rounded', 'object-cover')}
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
      </div>

      <div
        className={classNames('text-coolGray-600', 'dark:text-trueGray-400')}
      >
        <Typography
          as="h4"
          weight="semibold"
          className={classNames(
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
        </Typography>

        <Typography.Paragraph className="truncate-2-lines break-all">
          {description}
        </Typography.Paragraph>

        <Typography
          as="dl"
          size="sm"
          variant="wash"
          className={classNames('flex')}
        >
          <dt className="sr-only">ライバー</dt>
          <dd className="mr-2">{author}</dd>

          <dt className="sr-only">開始時刻</dt>
          <dd className="mr-2">
            <time dateTime={date.toISOString()}>{dayjs(date).fromNow()}</time>
          </dd>

          {tag != null && (
            <>
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
  if (props.loading != null && props.loading) {
    return <LoadingEntry {...props} />;
  }

  return <ReadyEntry {...props} />;
};

Entry.defaultProps = {
  loading: false,
  variant: 'shade',
  embed: null,
  embedType: 'interaction',
};
