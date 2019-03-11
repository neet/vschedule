import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from 'client/ui/styles';
import { useTranslation } from 'react-i18next';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { markerWidth } from 'client/ui/styles/constants';

export interface HeaderProps {
  dates: Dayjs[];
  startDate: Dayjs;
}

const Wrapper = styled.header`
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

// TODO: Move this to background/index.ts
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

export const Header = (props: HeaderProps) => {
  const { dates, startDate } = props;
  const { t } = useTranslation();
  const gapFromOrigin = (dayjs().diff(startDate, 'minute') * markerWidth ) / 30;

  return (
    <Wrapper style={{ marginLeft: `${(markerWidth / 2) * -1}px` }}>
      <Now style={{ transform: `translateX(${gapFromOrigin}px)` }}>
        <FontAwesomeIcon icon={faFire} />
        {t('timeline.now', { defaultValue: 'LIVE' })}
      </Now>

      {dates.map((date, i) => (
        <Date key={`${i}-${date.toString()}`} style={{ width: markerWidth }}>
          <time dateTime={date.toString()}>{date.format('HH:mm')}</time>
        </Date>
      ))}
    </Wrapper>
  );
};
