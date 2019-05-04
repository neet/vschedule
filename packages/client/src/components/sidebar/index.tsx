import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Trans, useTranslation } from 'react-i18next';
import { styled } from 'src/styles';
import { Content } from 'src/generated/graphql';
import { ContentCard } from 'src/components/content-card';
import { EventCardPlaceholders } from './placeholder';
import { sidebarWidth } from 'src/styles/constants';

export interface SidebarProps {
  contents?: Content[];
  loading: boolean;
}

interface WrapperProps {
  expanded: boolean;
}

const Wrapper = styled.aside<WrapperProps>`
  display: block;
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: ${({ expanded }) => (expanded ? '100%' : '20%')};
  padding: 18px;
  overflow: scroll;
  transition: 0.3s ease-out;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({ theme }) => theme.backgroundDark};
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 -1.5px 3px rgba(0, 0, 0, 0.16);

  @media screen and (min-width: 700px) {
    display: block;
    z-index: auto;
    top: 0;
    left: 0;
    width: ${sidebarWidth}px;
    height: auto;
    border-radius: 0;
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.16);
  }
`;

const ExpandButton = styled.button`
  display: block;
  width: 100%;
  margin-top: -8px;
  padding: 8px 0 12px;
  border: none;
  background-color: transparent;

  hr {
    display: block;
    width: 100px;
    height: 5px;
    margin: auto;
    border: none;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.foregroundLight};
  }

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 16px;

  & > strong {
    color: ${({ theme }) => theme.highlightNormal};
  }
`;

const List = styled.ul`
  display: block;
`;

const ListItem = styled.li`
  display: block;
`;

export const Sidebar = (props: SidebarProps) => {
  const { contents = [], loading } = props;
  const { t } = useTranslation();
  const [expanded, changeIfExpanded] = useState(false);

  const unfinishedContents = contents.filter(content =>
    dayjs(content.endDate).isAfter(dayjs()),
  );

  const streamingContents = contents.filter(
    content =>
      dayjs(content.startDate).isBefore(dayjs()) &&
      dayjs(content.endDate).isAfter(dayjs()),
  );

  const toggleIfExpanded = useCallback(() => changeIfExpanded(!expanded), [
    expanded,
  ]);

  return (
    <Wrapper id="sidebar" expanded={expanded} aria-expanded={expanded}>
      <ExpandButton aria-controls="sidebar" onClick={toggleIfExpanded}>
        <hr />
      </ExpandButton>

      <Title>
        {streamingContents.length > 0 ? (
          <Trans i18nKey="sidebar.title" count={streamingContents.length}>
            <strong>{{ count: streamingContents.length }}</strong> streaming is
            on air
          </Trans>
        ) : (
          t('sidebar.no_streaming', {
            defaultValue: "There's no streaming on air",
          })
        )}
      </Title>

      <List>
        {!loading ? (
          unfinishedContents.map((content, i) => (
            <ListItem
              key={content.id}
              aria-setsize={contents.length}
              aria-posinset={i + 1}
            >
              <ContentCard content={content} />
            </ListItem>
          ))
        ) : (
          <EventCardPlaceholders />
        )}
      </List>
    </Wrapper>
  );
};
