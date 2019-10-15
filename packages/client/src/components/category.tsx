import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryFragment } from 'src/generated/graphql';

interface CategoryProps {
  category: CategoryFragment;
}

export const Category = (props: CategoryProps) => {
  const { category } = props;

  return (
    <Link
      to={{
        pathname: '/activities',
        search: querystring.stringify({ category_id: category.id }),
      }}
    >
      #{category.name}
    </Link>
  );
};
