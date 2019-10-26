import React, { createContext, useState } from 'react';

interface LocaleState {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export const LocalStateContext = createContext<LocaleState>({
  showSidebar: false,
  setShowSidebar: _value => {},
});

export const LocalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <LocalStateContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </LocalStateContext.Provider>
  );
};
