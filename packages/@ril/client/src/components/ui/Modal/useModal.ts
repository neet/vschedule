import { useContext } from 'react';

import type { ModalContext } from './context';
import { ModalContextImpl } from './context';

export const useModal = (): ModalContext => {
  return useContext(ModalContextImpl);
};
