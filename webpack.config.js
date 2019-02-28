const webpack = require('webpack');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

require('dotenv');
const { env } = process;

module.exports = (isProd, isDevServer) => ({
  context: path.resolve(__dirname, 'client'),

  devtool: isProd ? false : 'source-map',

  entry: {
    client: './client/ui/main.ts',
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: isDevServer ? '/dist' : path.resolve(__dirname, 'dist'),
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
              publicPath: isDevServer ? '/dist' : path.resolve(__dirname, '../dist'),
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        IS_WATCH: JSON.stringify(env.IS_WATCH),
      },
    }),

    new WebpackNotifierPlugin({
      title: 'Refined Itsukara Link',
      alwaysNotify: true,
    }),
  ],

  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, '../dist'),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: false,
    port: 8080,
    index: 'index.html',
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});
