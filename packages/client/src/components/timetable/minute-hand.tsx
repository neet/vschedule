import { Dayjs } from 'dayjs';
import React from 'react';
import { styled } from 'src/styles';
import { SPELL_WIDTH } from './layout';
// import { useNow } from 'src/hooks/use-now';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  flex-direction: column;
  align-items: center;
  width: ${SPELL_WIDTH}px;
  height: 100%;
  margin: auto;
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

export const MinuteHand = () => {
  // const { count } = props;
  // const { t } = useTranslation();
  // const { now } = useNow(60 * 1000);

  // const x =
  //   (now.diff(timetableStartAt, 'minute') * SPELL_WIDTH) / 30 - SPELL_WIDTH / 2;

  // const shouldBeRendered =
  //   now.isAfter(timetableStartAt) && now.isBefore(timetableEndAt);

  // if (!shouldBeRendered) {
  //   return null;
  // }

  return (
    <Wrapper>
      <Border />
    </Wrapper>
  );
};
