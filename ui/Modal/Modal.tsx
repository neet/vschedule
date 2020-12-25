import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export interface ModalProps {
  readonly children: ReactNode;
  onHide?(): void;
}

export const Modal = (props: ModalProps): JSX.Element => {
  const { children, onHide } = props;

  useEffect(() => {
    const app = document.querySelector('#app');
    app.setAttribute('aria-hidden', 'true');

    return () => {
      app.setAttribute('aria-hidden', 'false');
      document.body.focus();
    };
  }, []);

  return createPortal(
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <motion.div
        className="bg-black w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        role="presentation"
        tabIndex={-1}
        aria-hidden
        onClick={onHide}
      />

      <div className="absolute top-0 left-0 w-full h-full flex place-items-center pointer-events-none">
        <div
          role="dialog"
          aria-modal
          className="z-20 w-1/3 m-auto bg-white rounded-lg overflow-hidden shadow-lg pointer-events-auto"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
