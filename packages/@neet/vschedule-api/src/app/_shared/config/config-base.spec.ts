import { ConfigBase } from './config-base';

describe('ConfigBase', () => {
  it('proxies constructor argument', () => {
    class Test extends ConfigBase {}

    const test = new Test({
      logger: {
        type: 'cloud-logging',
      },
      youtube: {
        dataApiKey: 'TEST_STRING',
      },
    });

    expect(test.logger.type).toBe('cloud-logging');
  });
});
