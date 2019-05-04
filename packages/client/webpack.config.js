const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const { env } = process;

const config = (isProd, isDevServer) => ({
  context: path.resolve(__dirname, 'src'),

  stats: 'errors-only',
  devtool: isProd ? false : 'source-map',

  entry: {
    client: './main.tsx',
  },

  output: {
    filename: isProd ? '[name]-[hash].js' : '[name].js',
    chunkFilename: isProd ? '[name]-[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'static/build'),
    publicPath: '/build',
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
              path: path.resolve(__dirname, 'static/build'),
              publicPath: '/build',
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
        configFile: path.resolve(__dirname, 'tsconfig.json'),
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      }),
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        APP_PROTOCOL: JSON.stringify(env.APP_PROTOCOL),
        APP_HOST: JSON.stringify(env.APP_HOST),
        APP_PORT: JSON.stringify(env.APP_PORT),
      },
    }),

    new OfflinePlugin({
      caches: {
        main: [':rest:'],
      },
      ServiceWorker: {
        output: 'sw.js',
        publicPath: '/sw.js',
        cacheName: 'refined-itsukara-link',
        minify: true,
      },
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      alwaysWriteToDisk: true,
    }),

    new HtmlWebpackHarddiskPlugin(),

    new WebpackNotifierPlugin({
      title: 'Refined itsukara.link',
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
    proxy: [
      {
        // Proxy everything but index.html (/)
        context: ['**', '!/'],
        target: 'http://localhost:3000',
      },
    ],
  },
});

module.exports = (command, { mode }) =>
  config(mode === 'production', command === 'webpack-dev-server');
