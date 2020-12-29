import { useNow } from '../../hooks/useNow';
import { Card } from '../../ui/Card';

export const Clock = (): JSX.Element => {
  const now = useNow();

  return (
    <Card variant="wash">
      <div className="flex items-center justify-between">
        <time
          className="text-coolGray-700 dark:text-trueGray-300 font-semibold text-4xl tabular-nums"
          dateTime={now.toISOString()}
          aria-live="polite"
          aria-label={now.format('HH:mm')}
        >
          <span>{now.format('HH')}</span>
          <span className="animate-pulse">:</span>
          <span>{now.format('mm')}</span>
        </time>
      </div>
    </Card>
  );
};
