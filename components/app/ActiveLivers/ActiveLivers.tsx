import classNames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useUpcomingEvents } from '../../hooks/useUpcomingEvents';
import { Card } from '../../ui/Card';
import { Link } from '../../ui/Link';
import { User } from '../../ui/User';

const MIN_ITEMS = 3;

export const ActiveLivers = (): JSX.Element => {
  const events = useUpcomingEvents();
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="wash">
      <h3
        className={classNames(
          'mb-2',
          'text-coolGray-700',
          'dark:text-trueGray-300',
        )}
      >
        <span className="font-semibold text-2xl">{events?.length ?? 0}人</span>
        が配信予定
      </h3>

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
              <li key={`${event.id}-${i}`}>
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
