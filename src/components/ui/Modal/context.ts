import { createContext } from 'react';

export interface ModalContext {
  readonly onHide?: () => void;
}

export const ModalContextImpl = createContext<ModalContext>({});
