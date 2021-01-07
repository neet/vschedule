import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { Button } from '../../ui/Button';
import { useTimetable } from '../../ui/Timetable';
import { Typography } from '../../ui/Typography';

export const Crown = (): JSX.Element => {
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
      </div>
    </header>
  );
};
