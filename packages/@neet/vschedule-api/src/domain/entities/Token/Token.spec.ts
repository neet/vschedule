import dayjs from 'dayjs';

import { Token } from './Token';

describe('Token', () => {
  it('expires after a specific period', () => {
    const base = dayjs();
    const token = Token.create(base.add(10, 'days'));
    const hasExpired = token.hasExpired(base.add(20, 'days'));
    expect(hasExpired).toBe(true);
  });
});
