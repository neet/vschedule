import React from 'react';
import { styled } from 'src/styles';
import { Wrapper, Thumbnail, Meta } from 'src/components/content-card';
import { pulse } from 'src/styles/keyframes';

const PlaceholderWrapper = styled.div`
  animation: ${pulse} 1s infinite ease-in-out;
`;

const Title = styled.div`
  width: 80%;
  height: 14px;
  margin: 4px 0;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.foregroundNormal};
`;

const Time = styled.div`
  width: 40%;
  height: 14px;
  margin: 4px 0;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.foregroundLight};
`;

export const EventCardPlaceholder = () => {
  return (
    <Wrapper isStreaming={false}>
      <Thumbnail />
      <Meta>
        <Title />
        <Time />
      </Meta>
    </Wrapper>
  );
};

export const EventCardPlaceholders = () => {
  return (
    <PlaceholderWrapper>
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
      <EventCardPlaceholder />
    </PlaceholderWrapper>
  );
};
