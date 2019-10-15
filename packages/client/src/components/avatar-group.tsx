import React from 'react';
import { PerformerFragment } from 'src/generated/graphql';
import { styled, css } from 'src/styles';
import { Avatar, AvatarProps } from './avatar';

interface WrapperProps {
  gap: number;
  size: number;
  count: number;
  align: 'right' | 'left';
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex: 0 0 auto;
  width: ${({ gap, size, count }) => (size + gap) * count - gap}px;

  ${({ gap, align }) =>
    align === 'right'
      ? css`
          & > *:not(:last-child) {
            margin-right: ${gap}px;
          }
        `
      : css`
          & > *:not(:first-child) {
            margin-left: ${gap}px;
          }
        `}
`;

interface AvatarGroupProps extends Pick<AvatarProps, 'size' | 'background'> {
  performers: PerformerFragment[];
  align: 'right' | 'left';
  gap?: number;
}

export const AvatarGroup = (props: AvatarGroupProps) => {
  const { performers, gap = -18, size, align, background } = props;

  return (
    <Wrapper gap={gap} align={align} size={size} count={performers.length}>
      {performers.map(member => (
        <Avatar
          key={member.id}
          performer={member}
          size={size}
          background={background}
        />
      ))}
    </Wrapper>
  );
};
