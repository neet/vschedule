import React from 'react';
import { PerformerFragment } from 'src/generated/graphql';
import { styled, css } from 'src/styles';
import { Avatar, AvatarProps } from 'src/components/avatar';

interface RowProps {
  gap: number;
  size: number;
  count: number;
  align: 'right' | 'left';
}

const Row = styled.div<RowProps>`
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

interface PieProps {
  count: number;
  size: number;
}

const Pie = styled.div<PieProps>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  overflow: hidden;
  border-radius: 50%;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
  }

  ${({ count, size }) =>
    /* Ratio = 1:1 */
    count === 2 &&
    css`
      & > img:nth-child(1) {
        clip-path: inset(0px ${size / 4}px 0px 0px);
        transform: translateX(-${size / 4}px);
      }

      & > img:nth-child(2) {
        clip-path: inset(0px 0px 0px ${size / 4}px);
        transform: translateX(${size / 4}px);
      }
    `};

  /* Ratio = 1:1:2 */
  ${({ count, size }) =>
    count >= 3 &&
    css`
      & > img:nth-child(1) {
        transform: translate(-${size / 4}px, -${size / 4}px) scale(0.5);
      }

      & > img:nth-child(2) {
        transform: translate(${size / 4}px, -${size / 4}px) scale(0.5);
      }

      & > img:nth-child(3) {
        clip-path: inset(${size / 4}px 0px ${size / 4}px 0px);
        transform: translateY(${size / 4}px);
      }
    `}

  /* Ratio = 1:1:1:1 */
  ${({ count, size }) =>
    count >= 4 &&
    css`
      & > img:nth-child(3) {
        clip-path: none;
        transform: translate(-${size / 4}px, ${size / 4}px) scale(0.5);
      }

      & > img:nth-child(4) {
        transform: translate(${size / 4}px, ${size / 4}px) scale(0.5);
      }

      & > img:nth-child(n + 5) {
        display: none;
      }
    `}
`;

interface AvatarGroupProps extends Pick<AvatarProps, 'size' | 'background'> {
  performers: PerformerFragment[];
  appearance: 'row' | 'pie';
  gap?: number;
}

export const AvatarGroup = (props: AvatarGroupProps) => {
  const { performers, gap = -18, size, appearance, background } = props;

  if (appearance === 'row') {
    return (
      <Row gap={gap} align="left" size={size} count={performers.length}>
        {performers.map(member => (
          <Avatar
            key={member.id}
            performer={member}
            size={size}
            background={background}
          />
        ))}
      </Row>
    );
  }

  return (
    <Pie size={size} count={performers.length}>
      {performers.map(member => (
        <Avatar
          key={member.id}
          appearance="square"
          performer={member}
          size={size}
          background={background}
        />
      ))}
    </Pie>
  );
};
