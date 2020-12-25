import dayjs from 'dayjs';
import classNames from 'classnames';
import { useState } from 'react';
import { Event } from '../../types';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { User } from '../../ui/User';

export interface ActiveLiversProps {
  readonly events: Event[];
}

// ここでuseTimetableを使うのはUIと密結合すぎるけど
// かといってpropsでライバーを受け取るとactiveかどうかの判定処理が外に漏れてて辛い

export const ActiveLivers = (props: ActiveLiversProps): JSX.Element => {
  const { events } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={classNames('bg-coolGray-100', 'dark:bg-trueGray-900', 'mb-4')}
    >
      <h3
        className={classNames(
          'mb-2',
          'text-coolGray-700',
          'dark:text-trueGray-300',
        )}
      >
        <span className="font-semibold text-2xl">{events.length}人</span>
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
        {events.slice(0, expanded ? Infinity : 3).map((event, i) => (
          <li key={`${event.id}-${i}`}>
            <User
              name={event.livers[0].name}
              avatar={event.livers[0].avatar}
              url={'/livers/' + event.livers[0].id}
              size="md"
              description={dayjs(event.start_date).fromNow()}
            />
          </li>
        ))}
      </ul>

      {events.length - 3 > 0 && (
        <div className="flex justify-start">
          {expanded ? (
            <Button variant="link" size="sm" onClick={() => setExpanded(false)}>
              閉じる
            </Button>
          ) : (
            <Button variant="link" size="sm" onClick={() => setExpanded(true)}>
              さらに表示
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
