import { AppConfigBase } from './AppConfigBase';

describe('AppConfigBase', () => {
  it('proxies constructor argument', () => {
    class Test extends AppConfigBase {}

    const test = new Test({
      logger: {
        type: 'cloud-logging',
      },
    });

    expect(test.logger.type).toBe('cloud-logging');
  });
});
