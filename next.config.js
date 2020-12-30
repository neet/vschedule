const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

  async redirects() {
    return [
      {
        source: '/activities',
        destination: '/',
        permanent: true,
      },
      {
        source: '/performers',
        destination: '/livers',
        permanent: true,
      },
    ]
  },

  pageExtensions: ['ts', 'tsx', 'mdx'],
});
