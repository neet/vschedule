import * as G from 'src/generated/graphql';
import { Performer } from 'src/entity/performer';

export const QueryResovlers: G.QueryResolvers = {
  performer: async (_parent, { id }, { loader }, info) => {
    const result = await loader.loadOne<Performer>(Performer, { id }, info);

    if (!result) {
      throw Error('Performer not found');
    }

    return result;
  },
};
