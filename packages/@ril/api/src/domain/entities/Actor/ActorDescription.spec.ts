import {
  ActorDescription,
  InvalidActorDescriptionError,
} from './ActorDescription';

describe('ActorDescription', () => {
  it('constructs', () => {
    const description = new ActorDescription('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new ActorDescription('a'.repeat(5001));
    }).toThrowError(InvalidActorDescriptionError);
  });
});
