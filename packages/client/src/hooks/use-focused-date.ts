import { useContext } from 'react';
import { LocalStateContext } from 'src/context';

export const useFocusedDate = () => {
  const { focusedDate, setFocusedDate } = useContext(LocalStateContext);

  return {
    focusedDate,
    setFocusedDate,
  };
};
