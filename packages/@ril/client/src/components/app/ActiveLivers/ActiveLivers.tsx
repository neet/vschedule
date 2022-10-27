import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { H } from 'react-headings';

import type { Event } from '../../../types';
import { Card } from '../../ui/Card';
import { Link } from '../../ui/Link';
import { Typography } from '../../ui/Typography';
import { User } from '../../ui/User';

const MIN_ITEMS = 3;

export interface ActiveLiversProps {
  readonly upcomingEvents?: readonly Event[];
}

export const ActiveLivers = (props: ActiveLiversProps): JSX.Element => {
  const { upcomingEvents: events } = props;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      const elm = document.querySelector(
        `*[data-liver="${MIN_ITEMS}"] > div > a`,
      );
      if (elm instanceof HTMLElement) elm.focus();
    }
  }, [expanded]);

  return (
    <Card variant="wash">
      {events != null ? (
        <Typography as={H} variant="normal" weight="semibold" size="2xl">
          {events.length}人
          <Typography as="span" size="base" variant="wash">
            {' '}
            が配信予定
          </Typography>
        </Typography>
      ) : (
        <div className="rounded animate-pulse h-8 my-2 w-2/3 bg-gray-200 dark:bg-neutral-800" />
      )}

      <ul
        className={classNames(
          'space-y-1',
          'mb-2',
          'divide-y',
          'divide-gray-200',
          'dark:divide-neutral-800',
        )}
      >
        {events == null
          ? Array.from({ length: MIN_ITEMS }, (_, i) => (
              <li key={`placeholder-${i}`}>
                <User loading size="md" />
              </li>
            ))
          : events.slice(0, expanded ? Infinity : MIN_ITEMS).map((event, i) => {
              const liver = event.livers[0];
              if (liver == null) return null;

              return (
                <li key={`${event.id}-${i}`} data-liver={i}>
                  <User
                    name={liver.name}
                    avatar={liver.avatar}
                    url={'/livers/' + liver.id.toString()}
                    size="md"
                    description={dayjs(event.start_date).fromNow()}
                  />
                </li>
              );
            })}
      </ul>

      {events && events.length - MIN_ITEMS > 0 && (
        <div className="flex justify-start">
          {expanded ? (
            <Link
              as="button"
              variant="wash"
              className="text-sm"
              onClick={() => void setExpanded(false)}
            >
              閉じる
            </Link>
          ) : (
            <Link
              as="button"
              className="text-sm"
              variant="wash"
              onClick={() => void setExpanded(true)}
            >
              さらに表示
            </Link>
          )}
        </div>
      )}
    </Card>
  );
};
