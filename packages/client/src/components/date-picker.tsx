import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import dayjs from 'dayjs';
import { styled } from 'src/styles';
import { useQueryParams } from 'use-query-params';
import { rgba } from 'polished';

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
    background-color: ${({ theme }) => rgba(theme.highlightNormal, 0.1)};
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
  const defaultAfterDate = dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
  const defaultBeforeDate = defaultAfterDate.clone().add(1, 'day');

  const [query, setQuery] = useQueryParams({
    after_date: DateParam,
    before_date: DateParam,
  });

  const {
    after_date = defaultAfterDate,
    before_date = defaultBeforeDate,
  } = query;

  const handleClickBack = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setQuery({
      after_date: after_date.clone().subtract(1, 'day'),
      before_date: before_date.clone().subtract(1, 'day'),
    });
  };

  const handleClickForward = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setQuery({
      after_date: after_date.clone().add(1, 'day'),
      before_date: before_date.clone().add(1, 'day'),
    });
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = dayjs(e.currentTarget.value);

    setQuery({
      after_date: value,
      before_date: value.clone().subtract(1, 'day'),
    });
  };

  return (
    <label htmlFor="datepicker">
      <Wrapper>
        <Chevron onClick={handleClickBack}>
          <ChevronLeft />
        </Chevron>

        <Time dateTime={after_date.toISOString()}>
          {after_date.format('LL')}
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
