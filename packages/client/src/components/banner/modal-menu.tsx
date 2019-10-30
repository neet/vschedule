import React, { useState } from 'react';
import { styled } from 'src/styles';
import { Modal as DefaultModal } from 'react-overlays';
import { Menu } from 'react-feather';
import { Button } from 'src/components/button';
import { MODAL } from 'src/styles/z-indices';
import { Navigation } from 'src/components/navigation';

const Wrapper = styled.div`
  & > button {
    display: block;

    @media screen and (min-width: 700px) {
      display: none;
    }
  }
`;

const Modal = styled(DefaultModal)`
  position: fixed;
  z-index: ${MODAL};
  top: 0;
  left: 0;
  box-sizing: border-box;
  min-width: 70%;
  height: 100%;
  padding: 21px;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: ${MODAL - 1};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalMenu = () => {
  const [showModalNav, setShowModalNav] = useState(false);

  return (
    <Wrapper>
      <Button appearance="skeleton">
        <Menu onClick={() => setShowModalNav(true)} />
      </Button>

      <Modal
        show={showModalNav}
        onHide={() => setShowModalNav(false)}
        renderBackdrop={props => <Backdrop {...props} />}
      >
        <Navigation />
      </Modal>
    </Wrapper>
  );
};
