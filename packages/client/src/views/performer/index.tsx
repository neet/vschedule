import React from 'react';
import { useParams } from 'react-router';
import { styled } from 'src/styles';
import { useFetchPerformerLargeQuery } from 'src/generated/graphql';
import { Team } from 'src/components/team';
import { SocialAccount } from 'src/components/social-account';
import { useTranslation } from 'react-i18next';
import { Activity } from 'src/components/activity';

const Inner = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  height: 60%;
  margin: auto;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.backgroundNormal};
`;

const FullBody = styled.div`
  flex: 0 0 auto;
  padding: 8px;

  & > img {
    margin: auto;
  }
`;

const Meta = styled.div`
  flex: 1 1 auto;
  padding: 18px;
  overflow-y: scroll;
`;

const List = styled.ul`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Name = styled.h2`
  margin-bottom: 4px;
  font-size: 24px;
`;

const Description = styled.p`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.foregroundLight};
`;

const Subtitle = styled.h3`
  margin-bottom: 4px;
  font-size: 18px;
`;

const Separator = styled.hr`
  margin: 12px auto;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.borderNormal};
`;

export const Performer = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data } = useFetchPerformerLargeQuery({
    variables: {
      id,
    },
  });

  if (!data || !data.performer || !data.activities) {
    return null;
  }

  const { performer, activities } = data;

  return (
    <Inner>
      <FullBody>
        <img src={performer.fullBody} alt={performer.name} />
      </FullBody>

      <Meta>
        <Name>{performer.name}</Name>
        <Description>{performer.description}</Description>

        <List>
          {performer.socialAccounts.map((socialAccount, i) => (
            <ListItem key={`${socialAccount.id}-${i}`}>
              <SocialAccount socialAccount={socialAccount} />
            </ListItem>
          ))}
        </List>

        <Separator />

        <List>
          <Subtitle>
            {t('performer.teams', { defaultValue: 'Collaborations' })}
          </Subtitle>

          {performer.teams.map(team => (
            <ListItem key={`${team.id}`}>
              <Team key={team.id} team={team} />
            </ListItem>
          ))}
        </List>

        <Separator />

        <List>
          <Subtitle>
            {t('performer.activities', { defaultValue: 'Activities' })}
          </Subtitle>

          {activities.edges.map(edge => (
            <ListItem key={`${edge.node.id}`}>
              <Activity activity={edge.node} />
            </ListItem>
          ))}
        </List>
      </Meta>
    </Inner>
  );
};
