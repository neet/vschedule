import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import dayjs from 'dayjs';
import { useQueryParams } from 'use-query-params';
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

const DateParam = {
  decode: (value: string | string[]) => {
    if (Array.isArray(value)) {
      throw new Error('unsupported value');
    }
    return dayjs(value);
  },

  encode: (date: dayjs.Dayjs) => date.toISOString(),
};

export const DatePicker = () => {
  const { focusedDate } = useFocusedDate();
  const [query, setQuery] = useQueryParams({
    after_date: DateParam,
  });

  const { after_date = focusedDate } = query;

  const handleClickBack = () => {
    setQuery({
      after_date: after_date.clone().subtract(1, 'day'),
    });
  };

  const handleClickForward = () => {
    setQuery({
      after_date: after_date.clone().add(1, 'day'),
    });
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = dayjs(e.currentTarget.value);

    setQuery({
      after_date: value,
    });
  };

  return (
    <label htmlFor="datepicker">
      <Wrapper>
        <Chevron onClick={handleClickBack}>
          <ChevronLeft />
        </Chevron>

        <Time dateTime={after_date.toISOString()}>
          {after_date.format('LLL')}
        </Time>

        <Chevron onClick={handleClickForward}>
          <ChevronRight />
        </Chevron>

        {/* For a11y */}
        <input
          type="date"
          name="datepicker"
          value={after_date.format('YYYY-MM-DD')}
          onChange={handleChangeDate}
          style={{ display: 'none' }}
        />
      </Wrapper>
    </label>
  );
};
