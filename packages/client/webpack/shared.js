const dotenv = require('dotenv');
const path = require('path');
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Shared webpack config
 * @param {String} command Command kind (should be either `webpack` or `webpack-dev-server`)
 * @param {Array} argv Argv passed to CLI
 */
function shared(command, argv) {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

  const isProd = argv.mode === 'production';

  const config = {
    context: path.resolve(__dirname, '../src'),
    stats: 'errors-only',
    devtool: isProd ? false : 'source-map',

    output: {
      filename: isProd ? '[name]-[hash].js' : '[name].js',
      path: path.resolve(__dirname, '../static/build'),
      publicPath: '/build/',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /.(graphql|gql)$/,
          exclude: /node_modules/,
          use: 'graphql-tag/loader',
        },
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProd ? '[name]-[hash].[ext]' : '[name].[ext]',
                path: path.resolve(__dirname, '../static/build'),
                publicPath: '/build/',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],

      plugins: [
        new TSConfigPathsWebpackPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
          extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        }),
      ],
    },

    plugins: [
      new webpack.NamedModulesPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
          BIND_PORT: JSON.stringify(process.env.BIND_PORT),
        },
      }),
    ],

    devServer: {
      compress: true,
      overlay: true,
      contentBase: path.resolve(__dirname, '../static'),
      disableHostCheck: true,
      historyApiFallback: {
        index: '/debug.html'
      },
      hot: true,
      inline: true,
      open: true,
      port: 8080,
      stats: 'errors-only',
      watchOptions: {
        ignored: /node_modules/,
      },
      proxy: [
        {
          // Proxy GraphQL endpoints
          context: ['/graphql'],
          target: `${process.env.PUBLIC_URL}/graphql`,
        },
      ],
    },
  };

  if (isProd) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),

      new WebpackNotifierPlugin({
        title: 'Refined itsukara.link',
        alwaysNotify: true,
        contentImage: path.resolve(__dirname, '../src/assets/logo-small.png'),
      }),
    );
  }

  return config;
}

module.exports = shared;
