// Borrowed from https://github.com/aspida/openapi2aspida
module.exports = {
  input: './src/api',
  outputEachDir: true,
  openapi: { inputFile: require.resolve('@neet/vschedule-api-spec') },
};
