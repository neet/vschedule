import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

const Wrapper = styled(Link)`
  color: ${({ theme }) => theme.foregroundNormal};
  font-weight: bold;
`;

interface CategoryProps {
  category: CategoryFragment;
}

export const Category = (props: CategoryProps) => {
  const { category } = props;

  return (
    <Wrapper
      to={{
        pathname: '/activities',
        search: querystring.stringify({ category_id: category.id }),
      }}
    >
      #{category.name}
    </Wrapper>
  );
};
