const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

  pageExtensions: ['ts', 'tsx', 'mdx'],
});
