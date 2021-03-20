const withMdxEnhanced = require('next-mdx-enhanced');

// https://github.com/hashicorp/next-mdx-enhanced
const mdxOptions = {
  layoutPath: 'src/layouts',
};

module.exports = withMdxEnhanced(mdxOptions)({
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
    ];
  },
});
