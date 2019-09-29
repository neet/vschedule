import { Activity } from 'react-feather';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { borderGap } from 'src/styles/constants';
import { rgba } from 'polished';

export interface MinuteHandProps {
  now: Dayjs;
  count: number;
  startAt: Dayjs;
}

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  width: ${borderGap}px;
  height: 100%;
`;

const Now = styled.div`
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

export const MinuteHand = (props: MinuteHandProps) => {
  const { now, count, startAt } = props;
  const { t } = useTranslation();
  const gapFromOrigin =
    (now.diff(startAt, 'minute') * borderGap) / 30 - borderGap / 2;

  return (
    <Wrapper style={{ transform: `translateX(${gapFromOrigin}px)` }}>
      <Now>
        <Activity size={14} />
        {t('timeline.now', { defaultValue: '{{count}} LIVE', count })}
      </Now>

      <Border />
    </Wrapper>
  );
};
