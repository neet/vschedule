import {
  PerformerDescription,
  PerformerDescriptionLengthError,
} from './performer-description';

describe('PerformerDescription', () => {
  it('constructs', () => {
    const description = new PerformerDescription('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new PerformerDescription('a'.repeat(5001));
    }).toThrowError(PerformerDescriptionLengthError);
  });
});
