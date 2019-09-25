import React from 'react';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { parseToRgb, darken, lighten, toColorString } from 'polished';

interface PerformerProps {
  performer: PerformerFragment;
}

interface WrapperProps {
  isLight: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 240px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 12px 18px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  color: ${({ theme, isLight }) =>
    isLight ? theme.foregroundNormal : theme.foregroundReverse};
  text-align: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: auto;
  margin: 0 auto 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.foregroundReverse};
`;

const Title = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
`;

const Description = styled.p``;

export const Performer = (props: PerformerProps) => {
  const { performer } = props;

  const isLight = (color: string) => {
    // Calc color brightness difference
    const { red, green, blue } = parseToRgb(color);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
  };

  const gradientStart = parseToRgb(
    isLight(performer.color) ? performer.color : lighten(0.2, performer.color),
  );

  const gradientEnd = parseToRgb(
    isLight(performer.color) ? darken(0.2, performer.color) : performer.color,
  );

  const backgroundImage = String.raw`linear-gradient(0deg,
    rgb(${gradientEnd.red},   ${gradientEnd.green},   ${gradientEnd.blue}),
    rgb(${gradientStart.red}, ${gradientStart.green}, ${gradientStart.blue})
  )`;

  return (
    <Wrapper
      isLight={isLight(toColorString(gradientEnd))}
      style={{ backgroundImage }}
    >
      <Avatar src={performer.avatar} alt={performer.name} />
      <Title>{performer.name}</Title>
      <Description>{performer.description}</Description>
    </Wrapper>
  );
};
