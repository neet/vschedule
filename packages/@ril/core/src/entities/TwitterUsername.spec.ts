import {
  TwitterUsername,
  TwitterUsernameInvalidCharacterError,
  TwitterUsernameTooLongError,
} from './TwitterUsername';

describe('TwitterUsername', () => {
  it('constructs', () => {
    const username = TwitterUsername.from('twitter_japan');
    expect(username.valueOf()).toBe('twitter_japan');
  });

  it('throws when non-username char given', () => {
    expect(() => TwitterUsername.from('こんにちは')).toThrowError(
      TwitterUsernameInvalidCharacterError,
    );
  });

  it('throws when too long string given', () => {
    expect(() => TwitterUsername.from('hello'.repeat(100))).toThrowError(
      TwitterUsernameTooLongError,
    );
  });
});
