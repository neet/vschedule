import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type {
  Liver as LiverType,
  LiverTwitterAccount,
  LiverYoutubeChannel,
} from '../../types';
import { Button } from '../../ui/Button';
import { User } from '../../ui/User';

export interface LiverProps {
  readonly liver: LiverType;
  readonly twitter?: LiverTwitterAccount;
  readonly youtube?: LiverYoutubeChannel;
  readonly size: 'sm' | 'md' | 'lg';
}

export const Liver = (props: LiverProps): JSX.Element => {
  const { liver, twitter, youtube, size } = props;

  return (
    <User
      name={liver.name}
      avatar={liver.avatar}
      url={`/livers/${liver.id}`}
      size={size}
      description={liver.description}
    >
      {(youtube || twitter) && (
        <div className="flex justify-end space-x-2 mt-2">
          {youtube && (
            <Button
              variant="wash"
              as="a"
              size="sm"
              href={'https://www.youtube.com/channel/' + youtube.channel}
              aria-label={`YouTubeチャンネル「${youtube.channel_name}」`}
            >
              <FontAwesomeIcon icon={faYoutube} className="mr-2" />
              {youtube.channel_name}
            </Button>
          )}

          {twitter && (
            <Button
              variant="wash"
              as="a"
              size="sm"
              href={'https://twitter.com/' + twitter.screen_name}
              aria-label={`Twitterアカウント「${twitter.screen_name}」`}
            >
              <FontAwesomeIcon icon={faTwitter} className="mr-2" />
              {twitter.screen_name}
            </Button>
          )}
        </div>
      )}
    </User>
  );
};

Liver.defaultProps = {
  size: 'md',
};
