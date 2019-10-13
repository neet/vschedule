import { useState, useCallback } from 'react';
import { useSearchQuery } from 'src/generated/graphql';

export const useSearchForm = () => {
  const [value, changeValue] = useState();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
  }, []);

  const { data } = useSearchQuery({ variables: { query: value } });

  return { value, onChange: handleChange, result: data };
};
