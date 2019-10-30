import React, { useState } from 'react';
import { animated, useTransition, config } from 'react-spring';
import { Menu } from 'react-feather';
import { styled } from 'src/styles';
import { Modal } from 'src/components/modal';
import { Button } from 'src/components/button';
import { Navigation } from 'src/components/navigation';
import { MODAL } from 'src/styles/z-indices';

const Wrapper = styled.div`
  & > button {
    display: block;

    @media screen and (min-width: 700px) {
      display: none;
    }
  }
`;

const NavigationWrapper = styled(animated.div)`
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

export const ModalMenu = () => {
  const [show, setShow] = useState(false);

  const modalTransitions = useTransition(show, null, {
    from: {
      opacity: 0,
      transform: 'translateX(-50px)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0px)',
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-50px)',
    },
    config: config.stiff,
  });

  return (
    <Wrapper>
      <Button appearance="skeleton">
        <Menu onClick={() => setShow(true)} />
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        {modalTransitions.map(
          ({ item, key, props }) =>
            item && (
              <NavigationWrapper key={key} style={props}>
                <Navigation />
              </NavigationWrapper>
            ),
        )}
      </Modal>
    </Wrapper>
  );
};
