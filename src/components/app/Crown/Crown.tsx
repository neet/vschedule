import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { Dayjs } from 'dayjs';

import type { Genre } from '../../../types';
import { Button } from '../../ui/Button';
import { Radio } from '../../ui/Radio';
import { Typography } from '../../ui/Typography';

export interface CrownProps {
  readonly focusedAt: Readonly<Dayjs>;
  readonly genre: number;
  readonly genres?: readonly Genre[];
  readonly loading: boolean;
  readonly nextDisabled?: boolean;
  readonly prevDisabled?: boolean;
  readonly onClickLatest?: () => void;
  readonly onClickNext?: () => void;
  readonly onClickPrev?: () => void;
  readonly onGenreChange?: (genre: number) => void;
}

export const Crown = (props: CrownProps): JSX.Element => {
  const {
    genre,
    genres,
    loading,
    focusedAt,
    nextDisabled,
    prevDisabled,
    onGenreChange,
    onClickLatest,
    onClickNext,
    onClickPrev,
  } = props;

  return (
    <header aria-labelledby="crown-title">
      <div
        className={classNames('flex', 'space-x-4', 'items-center', 'md:mb-1.5')}
      >
        <Typography
          id="crown-title"
          variant="wash"
          as="h2"
          className={classNames('md:text-xl')}
        >
          今日のにじさんじの配信
        </Typography>

        {loading && (
          <Typography size="lg" leading="none" variant="wash">
            <FontAwesomeIcon icon={faSpinner} spin />
          </Typography>
        )}
      </div>

      <div className={classNames('flex', 'justify-between', 'md:space-x-4')}>
        <div
          className={classNames(
            'flex',
            'flex-grow',
            'justify-between',
            'lg:justify-start',
            'lg:space-x-4',
            'items-center',
          )}
        >
          <time
            dateTime={focusedAt.toISOString()}
            className={classNames(
              'text-xl',
              'md:text-3xl',
              'text-primary-500',
              'dark:text-primary-400',
              'font-semibold',
              'tabular-nums',
              'leading-relaxed',
            )}
          >
            {focusedAt.format('LL')}
          </time>

          <div className="space-x-2">
            <Button
              className="w-8 h-8 sr-only focus:not-sr-only"
              onClick={onClickLatest}
              variant="wash"
              shape="circle"
              size="sm"
            >
              最新の配信へ移動
            </Button>

            <Button
              title="一日前へ移動"
              aria-label="一日前へ移動"
              className="w-8 h-8"
              onClick={onClickPrev}
              variant="wash"
              shape="circle"
              size="sm"
              disabled={prevDisabled}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>

            <Button
              title="一日後へ移動"
              aria-label="一日後へ移動"
              className="w-8 h-8"
              onClick={onClickNext}
              variant="wash"
              shape="circle"
              size="sm"
              disabled={nextDisabled}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>

        {genres != null && (
          // スマホはバーガーメニューから使えるのでクラウンに出す必要はないと思う
          <form className="hidden lg:block" aria-labelledby="crown-tags">
            <h3 id="crown-tags" className="sr-only">
              タグでフィルター
            </h3>

            <Radio
              name="filter"
              value={genre.toString()}
              onChange={(v) => void onGenreChange?.(Number(v))}
            >
              <Radio.Item label="全ての配信" value="-1" />

              {genres.map((item, i) => (
                <Radio.Item
                  key={`${item.id}-${i}`}
                  label={item.name}
                  value={item.id.toString()}
                />
              ))}
            </Radio>
          </form>
        )}
      </div>
    </header>
  );
};
