import React from 'react';
import { styled } from 'src/styles';
import usePortal from 'react-useportal';
import { useLocation, useHistory } from 'react-router';

const Wrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

interface ModalProps {
  children: React.ReactNode;
  parent: React.ComponentType<unknown>;
  parentPath: string;
}

export const Modal = (props: ModalProps) => {
  const { state } = useLocation<{ modal: boolean }>();
  const { children, parent: Parent, parentPath } = props;
  const history = useHistory();
  const { Portal } = usePortal({
    bindTo: document.getElementById('modal') || undefined,
  });

  const handleClick = () => {
    history.push(parentPath);

    if (state && state.modal) {
      history.go(-2);
    }
  };

  if (state && state.modal) {
    return (
      <Portal>
        <Wrapper onClick={handleClick}>{children}</Wrapper>
      </Portal>
    );
  }

  return (
    <>
      <Parent />
      <Portal>
        <Wrapper onClick={handleClick}>{children}</Wrapper>
      </Portal>
    </>
  );
};
