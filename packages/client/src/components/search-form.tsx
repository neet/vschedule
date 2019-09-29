import React from 'react';
import { styled } from 'src/styles';
import { Search } from 'react-feather';
import { useTranslation } from 'react-i18next';
import * as G from 'src/generated/graphql';
import { Activity } from './activity';
import { PerformerCompact } from './performer-compact';

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

const Results = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh / 2);
  margin-top: 38px;
  overflow: hidden;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundWash};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
`;

const List = styled.ul`
  margin-bottom: 8px;
`;

const ListItem = styled.li`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme }) => theme.backgroundNormal};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

interface SearchFormProps {
  value?: string;
  result?: G.SearchResultFragment;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchForm = (props: SearchFormProps) => {
  const { value, result, onChange } = props;
  const { t } = useTranslation();

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
      />

      {value && result ? (
        <Results>
          {result.performers.length ? (
            <List>
              {result.performers.map(performer => (
                <ListItem key={performer.id}>
                  <PerformerCompact performer={performer} />
                </ListItem>
              ))}
            </List>
          ) : null}

          {result.activities.length ? (
            <List>
              {result.activities.map(activity => (
                <ListItem key={activity.id}>
                  <Activity activity={activity} />
                </ListItem>
              ))}
            </List>
          ) : null}
        </Results>
      ) : null}
    </Wrapper>
  );
};
