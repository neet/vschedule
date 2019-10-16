import React from 'react';
import { styled } from 'src/styles';
import { useTranslation } from 'react-i18next';
import { Icon as FeatherIconType, Tv, User, Users, Hash } from 'react-feather';
import * as G from 'src/generated/graphql';
import { Activity } from 'src/components/activity';
import { Performer } from 'src/components/performer';
import { Team } from 'src/components/team';
import { Category } from 'src/components/category';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundDark};
`;

const List = styled.ul``;

const Title = styled.h4`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: ${({ theme }) => theme.foregroundLight};

  svg {
    margin-right: 0.5em;
  }
`;

interface ListItemProps {
  selected: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
  background-color: ${({ theme, selected }) =>
    selected ? theme.backgroundWash : theme.backgroundNormal};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.borderNormal};
  }
`;

interface SearchResultProps {
  result: G.SearchResultFragment;
  selectedIndex?: number;
  withGroupTitle?: boolean;
}

type Entry =
  | G.ActivityFragment
  | G.CategoryFragment
  | G.TeamFragment
  | G.PerformerFragment;

interface SearchResultGroupProps<T extends Entry> {
  items: T[];
  title: string;
  icon: FeatherIconType;
  result: G.SearchResultFragment;
  selectedIndex?: number;
  withGroupTitle?: boolean;
  render: (params: T) => React.ReactNode;
}

const SearchResultGroup = <T extends Entry>(
  props: SearchResultGroupProps<T>,
) => {
  const {
    items,
    icon: Icon,
    title,
    result,
    selectedIndex,
    withGroupTitle,
    render,
  } = props;

  if (!items.length) return null;

  const { categories, performers, teams, activities } = result;
  const flatResult = [categories, performers, teams, activities].flat();

  // prettier-ignore
  const getIndex = (item: Entry) => Object
    .entries<Entry>(flatResult)
    .findIndex(([, value]) => value === item)

  return (
    <div>
      {withGroupTitle && (
        <Title>
          <Icon size={16} />
          {title}
        </Title>
      )}

      <List>
        {items.map(item => (
          <ListItem
            key={item.id}
            data-index={`result-${getIndex(item)}`}
            selected={selectedIndex === getIndex(item)}
            aria-selected={selectedIndex === getIndex(item)}
          >
            {render(item)}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export const SearchResult = (props: SearchResultProps) => {
  const { result, withGroupTitle, selectedIndex } = props;
  const { t } = useTranslation();
  if (!result) return null;

  const options = {
    result,
    selectedIndex,
    withGroupTitle,
  };

  return (
    <Wrapper>
      <SearchResultGroup
        title={t('search.categories', { defaultValue: 'カテゴリー' })}
        icon={Hash}
        items={result.categories}
        render={category => <Category category={category} withCount />}
        {...options}
      />

      <SearchResultGroup
        title={t('search.performers', { defaultValue: 'ライバー' })}
        icon={User}
        items={result.performers}
        render={performer => <Performer performer={performer} />}
        {...options}
      />

      <SearchResultGroup
        title={t('search.teams', { defaultValue: 'ユニット' })}
        icon={Users}
        items={result.teams}
        render={team => <Team team={team} />}
        {...options}
      />

      <SearchResultGroup
        title={t('search.activities', { defaultValue: '配信' })}
        icon={Tv}
        items={result.activities}
        render={activity => <Activity activity={activity} withPerforemer />}
        {...options}
      />
    </Wrapper>
  );
};
