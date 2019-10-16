import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryFragment } from 'src/generated/graphql';
import { styled } from 'src/styles';

const Name = styled.span`
  font-weight: bold;
`;

const Count = styled.span`
  padding: 2px 8px;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.backgroundDark};
  color: ${({ theme }) => theme.foregroundLight};
  font-size: 12px;
`;

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.foregroundNormal};

  &:hover {
    text-decoration: none;

    ${Name} {
      text-decoration: underline;
    }
  }
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
      <Name>#{category.name}</Name>
      <Count>{category.activities.pageInfo.totalCount}</Count>
    </Wrapper>
  );
};
