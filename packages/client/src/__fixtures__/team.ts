import * as G from 'src/generated/graphql';
import { performer } from './performer';
import { activity } from './activity';

export const team = ({
  id: '00828dd8-d860-47d2-8500-e05e6f1e0db4',
  name: 'デロロギ',
  createdAt: '2019-09-29T11:55:53.656Z',
  updatedAt: '2019-09-29T11:55:53.656Z',
  members: [performer, performer],
  activities: [activity],
} as any) as G.TeamFragment;
