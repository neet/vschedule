import React, { useState, useCallback } from 'react';
import { SearchForm } from 'src/components/search-form';
import { useSearchQuery } from 'src/generated/graphql';

export const SearchFormContainer = () => {
  const [value, changeValue] = useState();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
  }, []);

  const { data } = useSearchQuery({ variables: { query: value } });

  return (
    <SearchForm
      value={value}
      result={data && data.search}
      onChange={handleChange}
    />
  );
};
