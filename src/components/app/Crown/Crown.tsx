import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import dayjs from 'dayjs';

import type { Genre } from '../../../types';
import { Button } from '../../ui/Button';
import { Radio } from '../../ui/Radio';
import { useTimetable } from '../../ui/Timetable';
import { Typography } from '../../ui/Typography';

export interface CrownProps {
  readonly genre: number;
  readonly genres?: readonly Genre[];
  readonly loading: boolean;
  readonly onGenreChange?: (genre: number) => void;
}

export const Crown = (props: CrownProps): JSX.Element => {
  const { genre, genres, loading, onGenreChange } = props;
  const { focusedAt, startAt, endAt, setFocusedAt } = useTimetable();

  // "today" or "yesterday" "tomorrow" here are defined as relative from the focus
  const zeroAmToday = focusedAt.millisecond(0).second(0).minute(0).hour(0);
  const zeroAmTomorrow = zeroAmToday.add(1, 'day');
  const zeroAmYesterday = zeroAmToday.subtract(1, 'day');

  const handleClickLatest = (): void => {
    gtag('event', 'click_crown_latest', {
      event_label: '最新の配信へ移動',
    });

    setFocusedAt(dayjs());
  };

  const handleClickRight = (): void => {
    gtag('event', 'click_crown_forward', {
      event_label: '一日前に移動',
    });

    // If focus is before the closest 0 AM
    if (focusedAt.isBefore(zeroAmToday)) {
      setFocusedAt(zeroAmToday);
      return;
    }

    setFocusedAt(dayjs.min(endAt, zeroAmTomorrow));
  };

  const handleClickLeft = (): void => {
    gtag('event', 'click_crown_forward', {
      event_label: '一日後に移動',
    });

    // If focus is after the closest 0 AM
    if (focusedAt.isAfter(zeroAmToday)) {
      setFocusedAt(zeroAmToday);
      return;
    }

    setFocusedAt(dayjs.max(startAt, zeroAmYesterday));
  };

  const handleGenreChange = (value: string): void => {
    gtag('event', 'click_change_genre', {
      event_label: value,
    });

    // DOMのフォームから取れる値をID where 数値に変換
    onGenreChange?.(Number(value));

    // 対応する座標がスクロール領域に存在する場合にしか動かないので、スクリーンリーダーでフォーカスされない
    // 本当はジャンルが変更された後の副作用として pages/index.tsx に持たせたいけど、
    // そうすると provider の関係上中間のコンポーネントが発生してしまう。そのコンポーネントの名前を考え中
    setFocusedAt(dayjs());
  };

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

      <div
        className={classNames(
          'flex',
          'items-center',
          'justify-between',
          'md:space-x-4',
        )}
      >
        <div
          className={classNames(
            'flex-grow',
            'flex-shrink-0',
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

          <div className="space-x-2 flex flex-nowrap">
            <Button
              title="一日前へ移動"
              aria-label="一日前へ移動"
              className="w-8 h-8"
              onClick={handleClickLeft}
              variant="wash"
              shape="circle"
              size="sm"
              disabled={focusedAt.isSame(startAt)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>

            <Button
              title="最新の配信へ移動"
              aria-label="最新の配信へ移動"
              className="w-8 h-8"
              onClick={handleClickLatest}
              variant="wash"
              shape="circle"
              size="sm"
            >
              <FontAwesomeIcon icon={faUndo} />
            </Button>

            <Button
              title="一日後へ移動"
              aria-label="一日後へ移動"
              className="w-8 h-8"
              onClick={handleClickRight}
              variant="wash"
              shape="circle"
              size="sm"
              disabled={focusedAt.isSame(endAt)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>

        {genres != null && (
          // スマホはバーガーメニューから使えるのでクラウンに出す必要はないと思う
          <form
            className="flex-grow flex-shrink hidden xl:block"
            aria-labelledby="crown-tags"
          >
            <h3 id="crown-tags" className="sr-only">
              タグでフィルター
            </h3>

            <Radio
              className="overflow-hidden justify-end"
              name="filter"
              value={genre.toString()}
              onChange={handleGenreChange}
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
