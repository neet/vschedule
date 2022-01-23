import { InvalidUrlError, Url } from './Url';

describe('Url', () => {
  it('constructs', () => {
    const vo = Url.from('http://example.com');
    expect(vo.valueOf()).toBe('http://example.com');
  });

  it('throws an error', () => {
    expect(() => Url.from('yay')).toThrowError(InvalidUrlError);
  });
});
