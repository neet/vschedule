import { useLocalStorage } from 'react-use';

export type UseSwapDeltaResult = [
  swapDelta: boolean,
  fn: (state: boolean) => void,
];

export const useSwapDelta = (): UseSwapDeltaResult => {
  const [swapDelta, setSwapDelta] = useLocalStorage('swap-delta', true);
  if (swapDelta == null) throw new Error();
  return [swapDelta, setSwapDelta];
};
