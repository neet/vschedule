import querystring from 'querystring';
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-feather';
import { useHistory } from 'react-router';
import { animated, useTransition, config } from 'react-spring';
import debounce from 'lodash.debounce';
import { styled } from 'src/styles';
import { useTranslation } from 'react-i18next';
import { useSearchForm } from 'src/hooks/use-search-form';
import { SearchResult } from 'src/components/search-result';
import { LoadingIndicator } from 'src/components/loading-indicator';
import { SearchResultFragment } from 'src/generated/graphql';

export const Wrapper = styled.div`
  position: relative;
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
  font-size: 16px;

  @media screen and (min-width: 700px) {
    font-size: 14px;
  }
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

const ResultWrapper = styled(animated.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh / 2);
  margin-top: 38px;
  overflow: scroll;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.backgroundWash};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const useSpreadTransition = (condition: boolean) => {
  return useTransition(condition, null, {
    from: {
      opacity: 0,
      transform: `scaleX(0.85) scaleY(0.75)`,
    },
    enter: {
      opacity: 1,
      transform: `scaleX(1) scaleY(1)`,
    },
    leave: {
      opacity: 0,
      transform: `scaleX(0.85) scaleY(0.75)`,
    },
    config: config.stiff,
  });
};

const hasAnyResult = (
  result?: SearchResultFragment,
): result is SearchResultFragment =>
  !!result &&
  Object.entries(result).some(([, value]) => {
    if (Array.isArray(value)) {
      return !!value.length;
    }

    return false;
  });

interface SearchFormProps {
  withResult?: boolean;
  onEnter?: () => void;
  onBlur?: () => void;
}

export const SearchForm = (props: SearchFormProps) => {
  const { withResult, onEnter, onBlur } = props;

  const { t } = useTranslation();
  const { search, result, loading } = useSearchForm();
  const history = useHistory();

  const node = useRef<HTMLDivElement>(null);
  const inputNode = useRef<HTMLInputElement>(null);
  const [value, changeValue] = useState('');
  const [showResult, changeIfShowResult] = useState(false);
  const [selectedIndex, select] = useState<number | undefined>();

  useEffect(() => {
    if (!node.current) return;
    const item = node.current.querySelector(
      `*[data-index="result-${selectedIndex}"]`,
    );

    if (item) {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleArrow = (action: 'up' | 'down') => {
    if (!result || !node.current) return;

    if (selectedIndex === undefined) {
      return select(0);
    }

    const { categories, performers, teams, activities } = result;
    const flatResult = [categories, performers, teams, activities].flat();

    if (action === 'down') {
      select(Math.min(flatResult.length - 1, selectedIndex + 1));
    }

    if (action === 'up') {
      select(Math.max(0, selectedIndex - 1));
    }
  };

  const handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      return handleArrow('up');
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      return handleArrow('down');
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      node.current &&
      e.target instanceof Node &&
      node.current.contains(e.target)
    ) {
      return;
    }

    changeIfShowResult(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  });

  const handleEnter = () => {
    history.push({
      pathname: `/search`,
      search: querystring.stringify({ q: value }),
    });

    changeIfShowResult(false);

    if (onEnter) {
      onEnter();
    }
  };

  const handleEnterItem = () => {
    if (selectedIndex === undefined || !node.current) return;

    const item = node.current.querySelector(
      `*[data-index="result-${selectedIndex}"]`,
    );
    if (!item) return;

    const childAnchor = item.querySelector('a');

    if (childAnchor && childAnchor instanceof HTMLElement) {
      childAnchor.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (selectedIndex !== undefined) {
        return handleEnterItem();
      }

      if (e.which !== 229 && !(e as any).isComposing) {
        return handleEnter();
      }
    }

    if (e.key === 'Escape') {
      changeIfShowResult(false);
    }
  };

  const handleFocus = () => {
    if (value) {
      changeIfShowResult(true);
    }
  };

  const debouncedSearch = debounce(search, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
    select(undefined);

    if (e.currentTarget.value) {
      changeIfShowResult(true);
      debouncedSearch({ variables: { query: e.currentTarget.value } });
    }
  };

  const transitions = useSpreadTransition(!!withResult && !!showResult);

  return (
    <Wrapper ref={node}>
      <Icon>
        <Search size={16} />
      </Icon>

      <Input
        type="text"
        role="search"
        value={value}
        ref={inputNode}
        title={t('search.title', {
          defaultValue:
            'Type keywords to search for activities, streamers, categories etc',
        })}
        placeholder={t('search.placeholder', {
          defaultValue: 'Search',
        })}
        onFocus={handleFocus}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <ResultWrapper key={key} style={props}>
              {loading ? (
                <LoadingIndicator />
              ) : hasAnyResult(result) ? (
                <SearchResult result={result} selectedIndex={selectedIndex} />
              ) : (
                t('search.not_found', { defaultValue: 'No search result' })
              )}
            </ResultWrapper>
          ),
      )}
    </Wrapper>
  );
};
