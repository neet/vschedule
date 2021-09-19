import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

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
      <Typography as="h3" variant="normal" weight="semibold" size="2xl">
        {events?.length ?? 0}人
        <Typography as="span" size="base" variant="wash">
          {' '}
          が配信予定
        </Typography>
      </Typography>

      <ul
        className={classNames(
          'space-y-1',
          'mb-2',
          'divide-y',
          'divide-coolGray-200',
          'dark:divide-trueGray-800',
        )}
      >
        {events == null
          ? Array.from({ length: MIN_ITEMS }, (_, i) => (
              <li key={`placeholder-${i}`}>
                <User loading size="md" />
              </li>
            ))
          : events.slice(0, expanded ? Infinity : MIN_ITEMS).map((event, i) => (
              <li key={`${event.id}-${i}`} data-liver={i}>
                <User
                  name={event.livers[0].name}
                  avatar={event.livers[0].avatar}
                  url={'/livers/' + event.livers[0].id.toString()}
                  size="md"
                  description={dayjs(event.start_date).fromNow()}
                />
              </li>
            ))}
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
