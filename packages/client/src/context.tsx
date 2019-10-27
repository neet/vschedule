import React, { createContext, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface LocaleState {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  focusedDate: Dayjs;
  setFocusedDate: (value: Dayjs) => void;
}

export const LocalStateContext = createContext<LocaleState>({
  showSidebar: false,
  setShowSidebar: _value => {},
  focusedDate: dayjs(),
  setFocusedDate: _value => {},
});

export const LocalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [focusedDate, setFocusedDate] = useState(dayjs());

  const value = {
    showSidebar,
    setShowSidebar,
    focusedDate,
    setFocusedDate,
  };

  return (
    <LocalStateContext.Provider value={value}>
      {children}
    </LocalStateContext.Provider>
  );
};
