const merge = require('webpack-merge');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const shared = require('./shared');

function main(command, argv) {
  const config = {
    entry: {
      main: './main.tsx'
    },

    plugins: [
      new ManifestPlugin(),
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
    ]
  }

  return merge(
    shared(command, argv),
    config,
  );
}

module.exports = main;
