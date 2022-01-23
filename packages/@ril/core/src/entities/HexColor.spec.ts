import { HexColor, InvalidHexColorError } from './HexColor';

describe('DataUrl', () => {
  it('constructs', () => {
    const data = HexColor.from('#ffffff');
    expect(data.valueOf()).toBe('#ffffff');
  });

  it('throws error when non-hex string given', () => {
    expect(() => HexColor.from('hello')).toThrowError(InvalidHexColorError);
  });
});
