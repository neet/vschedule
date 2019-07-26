import React from 'react';
import { render } from '@testing-library/react';
import { useInterval } from '../use-interval';

jest.useFakeTimers();

test('run callback after {delay}ms', () => {
  const fn = jest.fn();

  const Component = () => {
    useInterval(fn, 1000);

    return <div />;
  };

  render(<Component />);
  jest.runTimersToTime(1000);
  expect(fn).toHaveBeenCalledTimes(1);
});
