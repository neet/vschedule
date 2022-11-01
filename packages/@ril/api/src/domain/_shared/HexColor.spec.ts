import { Color, InvalidColorError } from './HexColor';

describe('Color', () => {
  it('constructs', () => {
    const data = Color.fromHex('#ffffff');
    expect(data.value).toBe('#ffffff');
  });

  it('throws error when non-hex string given', () => {
    expect(() => Color.fromHex('hello')).toThrowError(InvalidColorError);
  });
});
