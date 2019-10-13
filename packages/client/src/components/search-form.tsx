import React from 'react';
import { styled } from 'src/styles';
import { Search } from 'react-feather';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSearchForm } from 'src/hooks/use-search-form';
import { SearchResult } from './search-result';

const Wrapper = styled.div`
  position: relative;
  width: 320px;
  margin: 0 8px;
  border: 1px solid ${({ theme }) => theme.borderNormal};
  border-radius: 999px;
  background-color: ${({ theme }) => theme.backgroundWash};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 8px;
  padding-left: 32px;
  border: 0;
  background-color: transparent;
  font-size: 14px;
`;

const Icon = styled.span`
  display: flex;
  place-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 9px;
  margin: auto 0;
  color: ${({ theme }) => theme.foregroundLight};
`;

const ResultWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh / 2);
  margin-top: 38px;
  overflow: hidden;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundWash};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

export const SearchForm = () => {
  const { value, result, onChange } = useSearchForm();
  const { t } = useTranslation();
  const history = useHistory();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.which !== 229 && !(e as any).isComposing) {
      e.preventDefault();
      history.push({ pathname: `/search/${value}` });
    }
  };

  return (
    <Wrapper>
      <Icon>
        <Search size={16} />
      </Icon>

      <Input
        type="text"
        role="search"
        value={value}
        placeholder={t('search.placeholder', {
          defaultValue: 'Search',
        })}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <ResultWrapper>
          <SearchResult result={result} />
        </ResultWrapper>
      )}
    </Wrapper>
  );
};
