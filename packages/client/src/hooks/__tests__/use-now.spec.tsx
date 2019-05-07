import * as React from 'react';
import { render } from 'react-testing-library';
import { useInterval } from '../use-interval';
import { useNow } from '../use-now';

jest.mock('../use-interval');
jest.useFakeTimers();

test('run callback after {delay}ms', () => {
  const Component = () => {
    useNow(1000);

    return <div />;
  };

  render(<Component />);
  expect(useInterval as any).toHaveBeenCalledTimes(1);
  expect(useInterval as any).toHaveBeenCalledWith(expect.any(Function), 1000);
});
