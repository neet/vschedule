const path = require('path');
const merge = require('webpack-merge');
const shared = require('./shared');

function ssr(command, argv) {
  const config = {
    target: 'node',

    entry: {
      render: './render.tsx',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      library: 'SSR',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
  };

  return merge(shared(command, argv), config);
}

module.exports = ssr;
