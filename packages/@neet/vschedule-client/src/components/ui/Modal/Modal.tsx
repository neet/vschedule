/* eslint-disable @typescript-eslint/naming-convention */
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { ComponentType, ReactNode } from 'react';
import { memo, useCallback, useEffect } from 'react';
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
  readonly getContainer?: Element | (() => Element | null);
  readonly getRoot?: Element | (() => Element | null);
  readonly onHide?: () => void;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const ModalPure = (props: ModalProps): JSX.Element | null => {
  const { show, title, children, className, getRoot, getContainer, onHide } =
    props;

  const root = getRoot instanceof Element ? getRoot : getRoot?.();
  const container =
    getContainer instanceof Element ? getContainer : getContainer?.();

  const handleHide = useCallback((): void => {
    root?.setAttribute('aria-hidden', 'false');
    document.body.style.removeProperty('overflow');
    document.body.focus();
  }, [root]);

  const handleShow = useCallback((): void => {
    root?.setAttribute('aria-hidden', 'true');
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

  if (container == null || root == null) {
    return null;
  }

  return createPortal(
    <ModalProvider onHide={onHide}>
      <Transition
        appear
        show={show}
        className={classNames(
          'absolute',
          'inset-0',
          'w-full',
          'h-full',
          'z-10',
          className,
        )}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Backdrop className="absolute inset-0" />

        <div
          role="dialog"
          aria-label={title}
          aria-modal
          className={classNames(
            'absolute',
            'inset-0',
            'flex',
            'w-full',
            'h-full',
            'place-items-center',
            'pointer-events-none',
          )}
        >
          {children}
        </div>
      </Transition>
    </ModalProvider>,
    container,
  );
};

export const Modal = memo(ModalPure) as unknown as ComponentType<ModalProps> & {
  Window: typeof Window;
  Title: typeof Title;
  Body: typeof Body;
  Footer: typeof Footer;
  defaultProps: Partial<ModalProps>;
};

Modal.defaultProps = {
  show: true,
  getRoot: (): Element | null => document.getElementById('app'),
  getContainer: (): Element => document.body,
};

Modal.Window = Window;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
