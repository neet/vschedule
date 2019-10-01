import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import dayjs from 'dayjs';
import { styled } from 'src/styles';
import { useQueryParam, StringParam } from 'use-query-params';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.foregroundNormal};
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
`;

const Chevron = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background-color: none;
  color: ${({ theme }) => theme.foregroundLight};
`;

export const DatePicker = () => {
  const [rawDate, changeDate] = useQueryParam('start_since', StringParam);
  const date = rawDate
    ? dayjs(rawDate)
    : dayjs()
        .hour(0)
        .minute(0)
        .second(0);

  const handleClickBack = (_e: React.MouseEvent<HTMLButtonElement>) => {
    changeDate(date.subtract(1, 'day').toISOString());
  };

  const handleClickForward = (_e: React.MouseEvent<HTMLButtonElement>) => {
    changeDate(date.add(1, 'day').toISOString());
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeDate(dayjs(e.currentTarget.value).toISOString());
  };

  return (
    <label htmlFor="datepicker">
      <Wrapper>
        <Chevron onClick={handleClickBack}>
          <ChevronLeft />
        </Chevron>

        <span>{date.format('LL')}</span>

        <Chevron onClick={handleClickForward}>
          <ChevronRight />
        </Chevron>

        {/* For a11y */}
        <input
          type="date"
          name="datepicker"
          value={date.format('YYYY-MM-DD')}
          onChange={handleChangeDate}
          style={{ display: 'none' }}
        />
      </Wrapper>
    </label>
  );
};
