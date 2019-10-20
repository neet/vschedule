import React from 'react';
import { Loader } from 'react-feather';
import { styled } from 'src/styles';
import { spin } from 'src/styles/keyframes';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > svg {
    animation: ${spin} 2s ease-in-out infinite;
    color: ${({ theme }) => theme.foregroundLight};
  }
`;

export const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Loader size={38} />
    </Wrapper>
  );
};
