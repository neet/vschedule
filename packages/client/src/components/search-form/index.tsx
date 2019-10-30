import querystring from 'querystring';
import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'src/styles';
import { Search } from 'react-feather';
import { useHistory } from 'react-router';
import { animated, useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { useSearchForm } from 'src/hooks/use-search-form';
import { SearchResult } from 'src/components/search-result';
import { LoadingIndicator } from 'src/components/loading-indicator';

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

  const transitions = useTransition(withResult && showResult, null, {
    from: {
      opacity: 1,
      transform: `scalex(0.85) scaley(0.75)`,
    },
    enter: {
      opacity: 1,
      transform: `scalex(1) scaley(1)`,
    },
    leave: {
      opacity: 1,
      transform: `scalex(0.85) scaley(0.75)`,
    },
    config: {
      duration: 100,
    },
  });

  useEffect(() => {
    if (!node.current) return;
    const item = node.current.querySelector(
      `*[data-index="result-${selectedIndex}"]`,
    );

    if (item) {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleEnter = () => {
    history.push({
      pathname: `/search`,
      search: querystring.stringify({ q: value }),
    });

    changeIfShowResult(false);

    if (node.current) {
      node.current.blur();
    }

    if (onEnter) {
      onEnter();
    }
  };

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

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => document.removeEventListener('keydown', handleDocumentKeyDown);
  });

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
      if (!inputNode.current) return;
      return inputNode.current.blur();
    }
  };

  const handleFocus = () => {
    if (value) {
      changeIfShowResult(true);
    }
  };

  const handleBlur = () => {
    changeIfShowResult(false);

    if (onBlur) {
      onBlur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.currentTarget.value);
    select(undefined);

    if (e.currentTarget.value) {
      changeIfShowResult(true);
      search({ variables: { query: e.currentTarget.value } });
    }
  };

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
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <ResultWrapper key={key} style={props}>
              {loading ? (
                <LoadingIndicator />
              ) : result ? (
                <SearchResult result={result} selectedIndex={selectedIndex} />
              ) : (
                // TODO: this won't work
                t('search.not_found', { defaultValue: 'No search result' })
              )}
            </ResultWrapper>
          ),
      )}
    </Wrapper>
  );
};
