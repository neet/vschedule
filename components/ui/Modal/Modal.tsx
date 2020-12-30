import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop } from './Backdrop';
import { Body } from './Body';
import { Footer } from './Footer';
import { Title } from './Title';
import { Window } from './Window';

export interface ModalProps {
  readonly show: boolean;
  readonly app: string;
  readonly title: string;
  readonly root?: Element;
  readonly children: ReactNode;
  readonly className?: string;
  readonly onHide?: () => void;
}

export const Modal = (props: ModalProps): JSX.Element | null => {
  const { show, title, children, className, app, root, onHide } = props;

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const appRoot = document.getElementById(app);

    if (show) {
      appRoot?.setAttribute('aria-hidden', 'true');
      document.body.style.setProperty('overflow', 'hidden');
    } else {
      appRoot?.setAttribute('aria-hidden', 'false');
      document.body.style.removeProperty('overflow');
      document.body.focus();
    }
  }, [app, show]);

  useEffect(() => {
    ref?.focus();
  }, [ref]);

  if (root == null) {
    return null;
  }

  return createPortal(
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
        <Backdrop onClick={onHide} />
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
          tabIndex={0} // eslint-disable-line
          ref={setRef}
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
    </Transition>,
    root,
  );
};

Modal.defaultProps = {
  app: 'app',
  show: true,
};

Modal.Window = Window;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
