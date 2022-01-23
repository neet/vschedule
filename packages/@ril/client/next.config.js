const withMDX = require('@next/mdx')();

module.exports = withMDX({
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

  images: {
    domains: [
      'i.ytimg.com',
      'source.unsplash.com',
      's3-ap-northeast-1.amazonaws.com',
      'liver-icons.s3.ap-northeast-1.amazonaws.com',
      'liver-icons.s3-ap-northeast-1.amazonaws.com',
    ],
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
    ];
  },
});
