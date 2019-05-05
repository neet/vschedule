const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSConfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = (command, argv) => {
  const isProd = argv.mode === 'production';

  return {
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
          APP_PROTOCOL: JSON.stringify(process.env.APP_PROTOCOL),
          APP_HOST: JSON.stringify(process.env.APP_HOST),
          APP_PORT: JSON.stringify(process.env.APP_PORT),
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
    ],

    devServer: {
      compress: true,
      overlay: true,
      contentBase: path.resolve(__dirname, 'static'),
      disableHostCheck: true,
      historyApiFallback: {
        index: '/build/index.html'
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
          target: `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}/graphql`,
        },
      ],
    },
  }
};
