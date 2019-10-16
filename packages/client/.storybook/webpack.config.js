const path = require('path');
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = async ({ config, mode }) => {
  config.entry.push(
    path.resolve('./src/views/root')
  );

  if (!config.resolve.plugins) {
    config.resolve.plugins = [];
  }

  // Resolves `paths` option in tsconfig.json
  config.resolve.plugins.push(
    new TSConfigPathsWebpackPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json'),
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    })
  );

  config.module.rules.push(
    {
      test: /.(graphql|gql)$/,
      use: 'graphql-tag/loader',
    },
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
        require.resolve('react-docgen-typescript-loader')
      ]
    },
  );

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
