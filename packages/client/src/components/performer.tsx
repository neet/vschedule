import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { PerformerFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';
import { Avatar } from './avatar';

interface PerformerProps {
  performer: PerformerFragment;
}

const Wrapper = styled.div`
  width: 240px;
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 12px 18px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundNormal};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  color: ${({ theme }) => theme.foregroundNormal};
  text-align: center;

  & > img {
    margin: 0 auto 8px;
  }
`;

const Title = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.foregroundLight};
`;

export const Performer = (props: PerformerProps) => {
  const { performer } = props;

  return (
    <Wrapper>
      <Link
        to={{
          pathname: '/activities',
          search: querystring.stringify({ performer_id: performer.id }),
        }}
      >
        <Avatar size={80} performer={performer} background="performerColor" />
      </Link>
      <Title>{performer.name}</Title>
      <Description>{performer.description}</Description>
    </Wrapper>
  );
};
