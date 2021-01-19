import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { useGenres } from '../../hooks/useGenres';
import { Button } from '../../ui/Button';
import { Radio } from '../../ui/Radio';
import { useTimetable } from '../../ui/Timetable';
import { Typography } from '../../ui/Typography';

export interface CrownProps {
  readonly genre: number;
  readonly onGenreChange?: (genre: number) => void;
}

export const Crown = (props: CrownProps): JSX.Element => {
  const { genre, onGenreChange } = props;

  const { focusedAt, startAt, endAt, setFocusedAt } = useTimetable();
  const { data } = useGenres();

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
    // DOMのフォームから取れる値をID where 数値に変換
    onGenreChange?.(Number(value));
  };

  return (
    <header aria-labelledby="crown-title">
      <Typography
        id="crown-title"
        size="lg"
        className={classNames(
          'md:text-2xl',
          'text-coolGray-700',
          'dark:text-trueGray-300',
        )}
      >
        今日のにじさんじの配信
      </Typography>

      <div className="flex justify-between md:justify-start md:space-x-4 items-center">
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
            onClick={handleClickLatest}
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
            onClick={handleClickLeft}
            variant="wash"
            shape="circle"
            size="sm"
            disabled={focusedAt.isSame(startAt)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
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

        {data != null && (
          <form aria-labelledby="crown-tags">
            <h3 id="crown-tags" className="sr-only">
              タグでフィルター
            </h3>

            <Radio
              name="filter"
              value={genre.toString()}
              onChange={handleGenreChange}
            >
              <Radio.Item label="全ての配信" value="-1" />

              {data.data.genres.map((item, i) => (
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
