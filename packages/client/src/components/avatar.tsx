import React from 'react';
import { height } from 'styled-system';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

const Wrapper = styled.img`
  width: auto;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foregroundReverse};
  ${height}
`;

interface AvatarProps {
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
    <Wrapper
      src={avatar}
      alt={name}
      height={size}
      style={{ backgroundColor }}
    />
  );
};
