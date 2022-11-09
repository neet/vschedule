const { defineConfig } = require('orval');

module.exports = defineConfig({
  vschedule: {
    input: {
      target: require.resolve('@neet/vschedule-api-spec'),
    },
    output: {
      mode: 'split',
      target: 'src/api/endpoints/vschedule.ts',
      schemas: 'src/api/model',
      client: 'swr',
    },
  },
});
