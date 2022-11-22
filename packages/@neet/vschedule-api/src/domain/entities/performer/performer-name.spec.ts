import { PerformerName, PerformerNameLengthError } from './performer-name';

describe('PerformerName', () => {
  it('constructs', () => {
    const description = new PerformerName('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new PerformerName('a'.repeat(51));
    }).toThrow(PerformerNameLengthError);
  });
});
