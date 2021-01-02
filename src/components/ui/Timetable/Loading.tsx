import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Typography } from '../Typography';

export const Loading = (): JSX.Element => {
  return (
    <div className="absolute inset-0 m-auto w-8 h-8">
      <Typography variant="wash" as="span" className="block">
        <FontAwesomeIcon size="2x" className="animate-spin" icon={faSpinner} />
      </Typography>
    </div>
  );
};
