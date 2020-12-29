import dayjs from 'dayjs';
import classNames from 'classnames';
import { Button } from '../../ui/Button';
import { useTimetable } from '../../ui/Timetable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export const TimetableController = (): JSX.Element => {
  const { focusedAt, startAt, endAt, setFocusedAt } = useTimetable();

  const handleClickLatest = () => {
    setFocusedAt(dayjs());
  };

  const handleClickRight = () => {
    const tomorrow = focusedAt
      .clone()
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0)
      .add(1, 'day');

    setFocusedAt(tomorrow);
  };

  const handleClickLeft = () => {
    const yesterday = focusedAt
      .clone()
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0)
      .subtract(1, 'day');

    setFocusedAt(yesterday);
  };

  return (
    <header aria-label="今日のにじさんじの配信">
      <h1
        className={classNames(
          'text-lg',
          'md:text-2xl',
          'text-coolGray-700',
          'dark:text-trueGray-300',
        )}
      >
        今日のにじさんじの配信
      </h1>

      <div className="flex justify-between md:justify-start md:space-x-4 items-center">
        <time
          dateTime={focusedAt.toISOString()}
          className={classNames(
            'text-xl',
            'md:text-3xl',
            'text-primary-500',
            'dark:text-primary-400',
            'font-medium',
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
            disabled={focusedAt.diff(startAt, 'day') < 1}
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
            disabled={endAt.diff(focusedAt, 'day') < 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </header>
  );
};
