const withMdxEnhanced = require('next-mdx-enhanced');

// https://github.com/hashicorp/next-mdx-enhanced
const mdxOptions = {
  layoutPath: 'src/layouts',
};

module.exports = withMdxEnhanced(mdxOptions)({
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

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
