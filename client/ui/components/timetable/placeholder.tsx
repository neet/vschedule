import React from 'react';
import { styled } from 'client/ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  place-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 42px;
`;

const Icon = styled.div`
  margin: auto;
`;

export const Placeholder = () => (
  <Wrapper>
    <Icon>
      <FontAwesomeIcon icon={faCircleNotch} spin />
    </Icon>
  </Wrapper>
);
