import type { ReactNode } from 'react';

import { ModalContextImpl } from './context';

export interface ModalProviderProps {
  readonly onHide?: () => void;
  readonly children: ReactNode;
}

export const ModalProvider = (props: ModalProviderProps): JSX.Element => {
  const { onHide, children } = props;

  return (
    <ModalContextImpl.Provider value={{ onHide }}>
      {children}
    </ModalContextImpl.Provider>
  );
};
