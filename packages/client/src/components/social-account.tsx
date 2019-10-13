import React from 'react';
import { Twitter, Youtube } from 'react-feather';
import {
  SocialAccountFragment,
  TwitterAccount,
  YoutubeAccount,
} from 'src/generated/graphql';
import { styled } from 'src/styles';

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  /* padding: 8px 12px; */
  border-radius: 4px;
  color: ${({ theme }) => theme.foregroundLight};

  & > svg {
    margin-right: 8px;
  }
`;

interface SocialAccountProps {
  socialAccount: SocialAccountFragment;
}

const isTwitter = (sa: SocialAccountFragment): sa is TwitterAccount =>
  sa.__typename === 'TwitterAccount';

const isYoutube = (sa: SocialAccountFragment): sa is YoutubeAccount =>
  sa.__typename === 'YoutubeAccount';

export const SocialAccount = (props: SocialAccountProps) => {
  const { socialAccount } = props;

  // prettier-ignore
  const href
    = isTwitter(socialAccount) ? `https://twitter.com/${socialAccount.screenName}`
    : isYoutube(socialAccount) ? `https://www.youtube.com/channel/${socialAccount.channelId}`
    : undefined;

  // prettier-ignore
  const Icon =
    isTwitter(socialAccount) ? Twitter : Youtube;

  // prettier-ignore
  const name
    = isTwitter(socialAccount) ? '@' + socialAccount.screenName
    : isYoutube(socialAccount) ? socialAccount.channelName
    : undefined;

  // const backgroundColor = isTwitter(socialAccount) ? '#1DA1F2' : '#FF0000';

  return (
    <Wrapper
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // style={{ backgroundColor }}
    >
      <Icon size={16} />
      {name}
    </Wrapper>
  );
};
