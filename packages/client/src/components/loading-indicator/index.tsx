import React from 'react';
import { Loader } from 'react-feather';
import { styled } from 'src/styles';
import { spin } from 'src/styles/keyframes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Icon = styled.div`
  width: 38px;
  height: 38px;
  animation: ${spin} 2s ease-in-out infinite;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Description = styled.p`
  margin: 8px 0;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
`;

interface LoadingIndicatorProps {
  children?: React.ReactNode;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  return (
    <Wrapper>
      <Icon>
        <Loader size={38} />
      </Icon>

      <Description>{props.children}</Description>
    </Wrapper>
  );
};
