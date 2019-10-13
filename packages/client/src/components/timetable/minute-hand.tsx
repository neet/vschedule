import { Activity } from 'react-feather';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { rgba } from 'polished';
import { useNow } from 'src/hooks/use-now';
import { styled } from 'src/styles';
import { SPELL_WIDTH } from './layout';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  width: ${SPELL_WIDTH}px;
  height: 100%;
`;

const CurrentDate = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 0 0 auto;
  align-items: center;
  margin: 16px;
  margin-bottom: 0;
  padding: 4px 12px;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.highlightNormal};
  box-shadow: 0 1.5px 6px ${({ theme }) => rgba(theme.highlightNormal, 0.16)};
  color: ${({ theme }) => theme.foregroundReverse};
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  & > svg {
    margin-right: 0.25em;
  }
`;

const Border = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 1 0 auto;
  justify-content: center;
  border-left: 1px solid ${({ theme }) => theme.highlightNormal};
`;

export interface MinuteHandProps {
  count: number;
  timetableStartAt: Dayjs;
  timetableEndAt: Dayjs;
}

export const MinuteHand = (props: MinuteHandProps) => {
  const { count, timetableStartAt, timetableEndAt } = props;
  const { t } = useTranslation();
  const { now } = useNow(60 * 1000);

  const x =
    (now.diff(timetableStartAt, 'minute') * SPELL_WIDTH) / 30 - SPELL_WIDTH / 2;

  const shouldBeRendered =
    now.isAfter(timetableStartAt) && now.isBefore(timetableEndAt);

  if (!shouldBeRendered) {
    return null;
  }

  return (
    <Wrapper id="now" style={{ transform: `translateX(${x}px)` }}>
      <CurrentDate>
        <Activity size={14} />
        {t('timeline.now', { defaultValue: '{{count}} LIVE', count })}
      </CurrentDate>

      <Border />
    </Wrapper>
  );
};
