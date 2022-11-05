/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActorDescription,
  ActorDescriptionLengthError,
  ActorName,
  PerformerId,
  PerformerIdInvalidError,
} from '../../domain/entities';
import { catchAll } from './catch-all';

test('catchAll', () => {
  const lazy = {
    id: () => new PerformerId('123'),
    name: () => new ActorName('name'),
    description: () => new ActorDescription(''),
  };

  try {
    catchAll(lazy);
  } catch (e) {
    const error = e as any;
    expect(error.id).toBeInstanceOf(PerformerIdInvalidError);
    expect(error.description).toBeInstanceOf(ActorDescriptionLengthError);
  }
});
