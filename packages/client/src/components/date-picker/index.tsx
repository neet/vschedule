import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { styled } from 'src/styles';
import { useFocusedDate } from 'src/hooks/use-focused-date';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.time`
  margin: 0 8px;
  color: ${({ theme }) => theme.foregroundNormal};
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
`;

const Chevron = styled.button`
  display: flex;
  place-items: center;
  margin: 0;
  padding: 4px;
  transition: 0.15s ease-out;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.foregroundLight};

  &:hover {
    transition: 0.15s ease-in;
    background-color: ${({ theme }) => theme.highlightWash};
    color: ${({ theme }) => theme.highlightNormal};
  }
`;

export const DatePicker = () => {
  const { t } = useTranslation();
  const { focusedDate } = useFocusedDate();

  const handleClickBack = () => {
    const timetableNode = document.getElementById('timetable');
    if (!timetableNode) return;

    timetableNode.scrollBy({
      left: -1 * (timetableNode.clientWidth / 2),
      behavior: 'smooth',
    });
  };

  const handleClickForward = () => {
    const timetableNode = document.getElementById('timetable');
    if (!timetableNode) return;

    timetableNode.scrollBy({
      left: timetableNode.clientWidth / 2,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper>
      <Chevron
        title={t('date_picker.back', { defaultValue: 'Go back' })}
        onClick={handleClickBack}
      >
        <ChevronLeft />
      </Chevron>

      <Time dateTime={focusedDate.toISOString()}>
        {focusedDate.format('LLL')}
      </Time>

      <Chevron
        title={t('date_picker.forward', { defaultValue: 'Go forward' })}
        onClick={handleClickForward}
      >
        <ChevronRight />
      </Chevron>
    </Wrapper>
  );
};
