import React from 'react';
import { height } from 'styled-system';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
  overflow: hidden;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foregroundReverse};
`;

const Image = styled.img`
  width: auto;
  ${height}
`;

interface AvatarProps {
  performer: PerformerFragment;
  size: number;
  background?: 'auto' | 'performerColor';
}

export const Avatar = (props: AvatarProps) => {
  const { performer, size, background = 'auto' } = props;
  const { id, name, avatar } = performer;
  const backgroundColor =
    background === 'performerColor' ? performer.color : 'auto';

  return (
    <Wrapper to={{ pathname: `/performers/${id}`, state: { modal: true } }}>
      <Image
        src={avatar}
        alt={name}
        style={{ backgroundColor }}
        height={size}
      />
    </Wrapper>
  );
};
