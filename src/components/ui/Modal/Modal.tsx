import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop } from './Backdrop';
import { Body } from './Body';
import { Footer } from './Footer';
import { ModalProvider } from './ModalProvider';
import { Title } from './Title';
import { Window } from './Window';

export interface ModalProps {
  readonly show: boolean;
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly getContainer: Element | (() => Element);
  readonly getRoot: Element | (() => Element);
  readonly onHide?: () => void;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const Modal = (props: ModalProps): JSX.Element | null => {
  const {
    show,
    title,
    children,
    className,
    getRoot,
    getContainer,
    onHide,
  } = props;

  const root = getRoot instanceof Element ? getRoot : getRoot();
  const container =
    getContainer instanceof Element ? getContainer : getContainer();

  const handleHide = useCallback((): void => {
    root.setAttribute('aria-hidden', 'false');
    document.body.style.removeProperty('overflow');
    document.body.focus();
  }, [root]);

  const handleShow = useCallback((): void => {
    root.setAttribute('aria-hidden', 'true');
    document.body.style.setProperty('overflow', 'hidden');
  }, [root]);

  useEffect(() => {
    const handleKeydown = (e: Readonly<KeyboardEvent>): void => {
      if (e.key === 'Escape') onHide?.();
    };

    document.addEventListener('keydown', handleKeydown);
    return () => void document.removeEventListener('keydown', handleKeydown);
  }, [onHide]);

  useEffect(() => {
    if (show) handleShow();
    else handleHide();
    return handleHide;
  }, [show, handleShow, handleHide]);

  return createPortal(
    <ModalProvider onHide={onHide}>
      <Transition
        show={show}
        className={classNames(
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          'z-10',
          className,
        )}
      >
        <Transition.Child
          className="absolute top-0 left-0 w-full h-full"
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
        >
          <Backdrop />
        </Transition.Child>

        <Transition.Child
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            role="dialog"
            aria-label={title}
            aria-modal
            className={classNames(
              'flex',
              'w-full',
              'h-full',
              'place-items-center',
              'pointer-events-none',
            )}
          >
            {children}
          </div>
        </Transition.Child>
      </Transition>
    </ModalProvider>,
    container,
  );
};

Modal.defaultProps = {
  show: true,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  getRoot: (): Element => document.getElementById('app')!,
  getContainer: (): Element => document.body,
};

Modal.Window = Window;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
