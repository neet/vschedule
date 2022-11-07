import {
  TwitterUsername,
  TwitterUsernameInvalidCharacterError,
  TwitterUsernameTooLongError,
} from './TwitterUsername';

describe('TwitterUsername', () => {
  it('constructs', () => {
    const username = new TwitterUsername('twitter_japan');
    expect(username.value).toBe('twitter_japan');
  });

  it('throws when non-username char given', () => {
    expect(() => new TwitterUsername('こんにちは')).toThrowError(
      TwitterUsernameInvalidCharacterError,
    );
  });

  it('throws when too long string given', () => {
    expect(() => new TwitterUsername('hello'.repeat(100))).toThrowError(
      TwitterUsernameTooLongError,
    );
  });
});
