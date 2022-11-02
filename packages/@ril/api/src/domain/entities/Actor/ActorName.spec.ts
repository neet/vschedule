import { ActorName, InvalidActorNameError } from './ActorName';

describe('ActorName', () => {
  it('constructs', () => {
    const description = new ActorName('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new ActorName('a'.repeat(51));
    }).toThrowError(InvalidActorNameError);
  });
});
