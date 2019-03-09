import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '../styles';
import { useTranslation } from 'react-i18next';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TimelineDatesProps {
  dates: Dayjs[];
  basisDate: Dayjs;
  gridWidth: number;
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Date = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 18px;
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const Now = styled.div`
  position: absolute;
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 18px;
  padding: 4px 12px;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.highlightNormal};
  color: ${({ theme }) => theme.foregroundReverse};
  font-size: 12px;
  font-weight: bold;
  text-align: center;

  & > svg {
    margin-right: 0.25em;
  }
`;

export const TimelineDates = (props: TimelineDatesProps) => {
  const { basisDate, gridWidth } = props;
  const { t } = useTranslation();
  const gapFromOrigin = (dayjs().diff(basisDate, 'minute') * gridWidth) / 30;

  return (
    <Wrapper style={{ marginLeft: `${(gridWidth / 2) * -1}px` }}>
      <Now style={{ transform: `translateX(${gapFromOrigin}px)` }}>
        <FontAwesomeIcon icon={faFire} />
        {t('timeline.now', { defaultValue: 'LIVE' })}
      </Now>

      {props.dates.map((date, i) => (
        <Date key={`${i}-${date.toString()}`} style={{ width: gridWidth }}>
          <span>{date.format('HH:mm')}</span>
        </Date>
      ))}
    </Wrapper>
  );
};
