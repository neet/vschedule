import * as G from 'src/generated/graphql';
import { serializePerformer } from 'src/serializers/performer';
import { serializeActivity } from 'src/serializers/activity';
import { serializeTeam } from 'src/serializers/team';
import { serializeCategory } from 'src/serializers/category';

export const rootSearch: G.QueryResolvers['search'] = async (
  _,
  { query },
  { repositories, elasticsearch },
) => {
  const activities = await elasticsearch
    .search({
      index: 'activity',
      type: '_doc',
      body: {
        query: {
          query_string: {
            fields: ['name'],
            query,
          },
        },
      },
    })
    .then(result =>
      result.body.hits.hits.map((hit: { _id: string }) => hit._id),
    )
    .then(ids =>
      repositories.activity.find
        .loadMany(ids)
        .then(results => results.map(activity => serializeActivity(activity))),
    );

  const performers = await elasticsearch
    .search({
      index: 'performer',
      type: '_doc',
      body: {
        query: {
          query_string: {
            fields: ['name'],
            query,
          },
        },
      },
    })
    .then(result =>
      result.body.hits.hits.map((hit: { _id: string }) => hit._id),
    )
    .then(ids =>
      repositories.performer.find
        .loadMany(ids)
        .then(results =>
          results.map(performer => serializePerformer(performer)),
        ),
    );

  const teams = await elasticsearch
    .search({
      index: 'team',
      type: '_doc',
      body: {
        query: {
          query_string: {
            fields: ['name'],
            query,
          },
        },
      },
    })
    .then(result =>
      result.body.hits.hits.map((hit: { _id: string }) => hit._id),
    )
    .then(ids =>
      repositories.team.find
        .loadMany(ids)
        .then(results => results.map(team => serializeTeam(team))),
    );

  const categories = await elasticsearch
    .search({
      index: 'category',
      type: '_doc',
      body: {
        query: {
          query_string: {
            fields: ['name'],
            query,
          },
        },
      },
    })
    .then(result =>
      result.body.hits.hits.map((hit: { _id: string }) => hit._id),
    )
    .then(ids =>
      repositories.category.find
        .loadMany(ids)
        .then(results => results.map(category => serializeCategory(category))),
    );

  return {
    performers,
    activities,
    teams,
    categories,
  };
};
