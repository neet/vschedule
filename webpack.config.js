const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

require('dotenv').config();
const { env } = process;

const config = (isProd, isDevServer) => ({
  context: path.resolve(__dirname, 'client'),

  stats: 'errors-only',
  devtool: isProd ? false : 'source-map',

  entry: {
    client: './ui/main.tsx',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'static'),
    publicPath: isDevServer ? '/static' : path.resolve(__dirname, 'static'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
              name: '[name].[ext]',
              path: path.resolve(__dirname, 'static'),
              publicPath: isDevServer ? '/static' : path.resolve(__dirname, 'static'),
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
        configFile: path.resolve(__dirname, 'client/tsconfig.json'),
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      })
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        API_URL: JSON.stringify(env.API_URL),
      },
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './ui/index.html',
      alwaysWriteToDisk: true,
    }),

    new HtmlWebpackHarddiskPlugin(),

    new WebpackNotifierPlugin({
      title: 'Refined Itsukara Link',
      alwaysNotify: true,
    }),

    new WebpackBar(),
  ],

  devServer: {
    compress: true,
    overlay: true,
    contentBase: path.resolve(__dirname, 'static'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    index: 'index.html',
    inline: true,
    open: true,
    port: 8080,
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});

module.exports = (command, { mode }) =>
  config(mode === 'production', command === 'webpack-dev-server')
