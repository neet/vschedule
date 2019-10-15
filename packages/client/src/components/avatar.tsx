import React from 'react';
import { height } from 'styled-system';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

const Image = styled.img`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foregroundReverse};
  ${height}
`;

export interface AvatarProps {
  performer: PerformerFragment;
  size: number;
  background?: 'auto' | 'performerColor';
}

export const Avatar = (props: AvatarProps) => {
  const { performer, size, background = 'auto' } = props;
  const { name, avatar } = performer;
  const backgroundColor =
    background === 'performerColor' ? performer.color : 'auto';

  return (
    <Image
      src={avatar}
      alt={name}
      style={{ backgroundColor, height: size, width: size }}
    />
  );
};
