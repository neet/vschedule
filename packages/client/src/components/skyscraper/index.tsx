import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from 'src/styles';
import { ActivityFragment } from 'src/generated/graphql';
import { DatePicker } from 'src/components/date-picker';
import { ActivityList } from './activitiy-list';

interface WrapperProps {
  show: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 50px);
  margin: auto;
  padding: 8px 12px;
  overflow: scroll;
  transform: translateY(${({ show }) => (show ? '0px' : 'calc(100% - 80px)')});
  transition: 0.15s ease-out;
  border-top: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};

  @media screen and (min-width: 700px) {
    width: 340px;
    transform: unset;
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

const DragSignifier = styled.button`
  display: block;
  box-sizing: border-box;
  width: 40%;
  height: 4px;
  margin: 8px auto;
  border: none;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.borderNormal};

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const DatePickerContainer = styled.div`
  margin-bottom: 8px;

  & > div {
    justify-content: space-between;
  }
`;

interface SkyscraperProps {
  activities: ActivityFragment[];
  focusedDate: Dayjs;
}

export const Skyscraper = (props: SkyscraperProps) => {
  const { focusedDate } = props;
  const [hasExpanded, setHasExpanded] = useState(false);

  const activities = props.activities.filter((activity) =>
    dayjs(activity.endAt).isAfter(focusedDate),
  );

  return (
    <Wrapper show={hasExpanded}>
      <DragSignifier onClick={() => setHasExpanded(!hasExpanded)} />

      <DatePickerContainer>
        <DatePicker />
      </DatePickerContainer>

      <ActivityList activities={activities} focusedDate={focusedDate} />
    </Wrapper>
  );
};
