import React from 'react';
import { styled } from 'src/styles';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 14px;
  overflow: scroll;

  @media screen and (min-width: 700px) {
    padding: 24px;
  }
`;

const Inner = styled.article`
  width: 100%;
  margin: auto;

  @media screen and (min-width: 700px) {
    width: 700px;
  }
`;

type PageProps = JSX.IntrinsicElements['div'] & {
  children: React.ReactNode;
};

export const Page = (props: PageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ref: _ref, ...rest } = props;

  return (
    <Wrapper {...rest}>
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
