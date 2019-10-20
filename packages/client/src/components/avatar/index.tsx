import React from 'react';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

interface ImageProps {
  appearance: 'rounded' | 'square';
}

const Image = styled.img<ImageProps>`
  border-radius: ${({ appearance }) =>
    appearance === 'rounded' ? '50%' : '0'};
  background-color: ${({ theme }) => theme.foregroundReverse};
`;

export interface AvatarProps {
  performer: PerformerFragment;
  size: number;
  appearance?: 'rounded' | 'square';
  background?: 'auto' | 'performerColor';
}

export const Avatar = (props: AvatarProps) => {
  const {
    performer,
    size,
    appearance = 'rounded',
    background = 'auto',
  } = props;

  const { name, avatar } = performer;
  const backgroundColor =
    background === 'performerColor' ? performer.color : 'auto';

  return (
    <Image
      src={avatar}
      alt={name}
      appearance={appearance}
      style={{ backgroundColor, height: size, width: size }}
    />
  );
};
