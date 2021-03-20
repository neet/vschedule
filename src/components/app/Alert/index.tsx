import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useLocalStorage } from 'react-use';

import { Button } from '../../ui/Button';
import { Link } from '../../ui/Link';

const INCIDENT_LINK =
  'https://twitter.com/nijisanji_app/status/1355068179337375745';

export const Alert = (): JSX.Element | null => {
  const [hidden, setHidden] = useLocalStorage(
    'message-jan-29th-2021-hidden',
    false,
  );

  if (hidden != null && hidden) {
    return null;
  }

  return (
    <div
      className={classNames(
        'flex',
        'border',
        'py-2',
        'px-4',
        'rounded',
        'bg-primary-100',
        'border-primary-500',
        'text-primary-800',
        'dark:bg-primary-900',
        'dark:border-primary-400',
        'dark:text-primary-200',
      )}
    >
      <p className={classNames('flex-grow')}>
        <FontAwesomeIcon icon={faExclamationCircle} />
        「いつから.link」の障害による影響で最新データの反映が行われていない可能性があります。{' '}
        <Link>
          <a href={INCIDENT_LINK}>にじさんじ公式Twitter</a>
        </Link>{' '}
        も併せてご参照ください。
      </p>

      <Button
        variant="skeleton"
        aria-label="メッセージを消す"
        title="メッセージを消す"
      >
        <FontAwesomeIcon
          className={classNames('text-primary-900', 'dark:text-primary-100')}
          icon={faTimes}
          onClick={() => void setHidden(true)}
        />
      </Button>
    </div>
  );
};
