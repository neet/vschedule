import React from 'react';
import { styled } from 'client/ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

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
  font-size: 42px;
`;

export const Placeholder = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Icon>
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </Icon>
      <p>{t('timetable.loading', { defaultValue: 'Loading Timetable...' })}</p>
    </Wrapper>
  );
};
