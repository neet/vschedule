import React from 'react';
import usePortal from 'react-useportal';
import { useTransition, animated, config } from 'react-spring';
import { styled } from 'src/styles';
import { MODAL } from 'src/styles/z-indices';

const Backdrop = styled(animated.div)`
  position: fixed;
  z-index: ${MODAL - 1};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
  onHide: () => void;
}

export const Modal = (props: ModalProps) => {
  const { show, children, onHide } = props;
  const { Portal } = usePortal({
    bindTo: document.getElementById('modal') || undefined,
  });

  const backdropTransitions = useTransition(show, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    config: config.stiff,
  });

  return (
    <Portal>
      <>
        {backdropTransitions.map(
          ({ item, key, props }) =>
            item && (
              <Backdrop key={key} style={props} onClick={() => onHide()} />
            ),
        )}

        {children}
      </>
    </Portal>
  );
};
