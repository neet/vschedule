import React, { useState } from 'react';
import { Search } from 'react-feather';
import { SearchForm } from 'src/components/search-form';
import { Button } from 'src/components/button';
import { styled } from 'src/styles';
import { MODAL } from 'src/styles/z-indices';
import { animated } from 'react-spring';
import { Modal } from '../modal';

const Wrapper = styled.div`
  display: block;
  position: relative;

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const SearchFormWrapper = styled(animated.div)`
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

export const CompactSearchForm = () => {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Button appearance="skeleton" onClick={() => setShow(true)}>
        <Search />
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        {show && (
          <SearchFormWrapper>
            <SearchForm
              withResult
              onEnter={() => setShow(false)}
              onBlur={() => setShow(false)}
            />
          </SearchFormWrapper>
        )}
      </Modal>
    </Wrapper>
  );
};
