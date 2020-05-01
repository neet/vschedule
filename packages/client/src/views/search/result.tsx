import React from 'react';
import { styled } from 'src/styles';
import { SearchResult } from 'src/components/search-result';
import { useSearchQuery } from 'src/generated/graphql';

const Container = styled.div`
  margin: 18px 0;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
`;

export interface ResultProps {
  q: string;
}

export const Result = (props: ResultProps) => {
  const { q } = props;
  const { data } = useSearchQuery({ variables: { query: q } });

  if (!data || !data.search) {
    return null;
  }

  return (
    <Container>
      <SearchResult result={data.search} withGroupTitle />
    </Container>
  );
};
