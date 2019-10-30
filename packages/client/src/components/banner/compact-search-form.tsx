import React, { useState } from 'react';
import { Modal as DefaultModal } from 'react-overlays';
import { Search } from 'react-feather';
import { SearchForm } from 'src/components/search-form';
import { Button } from 'src/components/button';
import { styled } from 'src/styles';
import { MODAL } from 'src/styles/z-indices';

const Wrapper = styled.div`
  display: block;
  position: relative;

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const Modal = styled(DefaultModal)`
  display: block;
  position: fixed;
  z-index: ${MODAL};
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 90%;
  margin: 18px auto 0px;
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

export const CompactSearchForm = () => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Button appearance="skeleton" onClick={() => setShow(true)}>
        <Search />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={props => <Backdrop {...props} />}
      >
        <SearchForm
          withResult
          onEnter={() => setShow(false)}
          onBlur={() => setShow(false)}
        />
      </Modal>
    </Wrapper>
  );
};
