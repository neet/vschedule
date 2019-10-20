import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { Loader } from 'react-feather';
import { spin } from 'src/styles/keyframes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Icon = styled.div`
  width: 38px;
  height: 38px;
  animation: ${spin} 2s ease-in-out infinite;
`;

const Description = styled.p`
  margin: 8px 0;
  font-size: 12px;
`;

export const Placeholder = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Icon>
        <Loader size={38} />
      </Icon>

      <Description>
        {t('timetable.loading', { defaultValue: 'Loading Timetable...' })}
      </Description>
    </Wrapper>
  );
};
