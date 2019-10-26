import { useState, useCallback, useEffect } from 'react';
import { useSearchLazyQuery } from 'src/generated/graphql';

export const useSearchForm = () => {
  const [value, changeValue] = useState();
  const [search, { data }] = useSearchLazyQuery();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
  }, []);

  useEffect(() => {
    if (!value) return;
    search({ variables: { query: value } });
  }, [search, value]);

  return { value, onChange: handleChange, result: data && data.search };
};
