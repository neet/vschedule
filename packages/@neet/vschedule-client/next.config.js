const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,

  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },

  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

  images: {
    domains: [
      'api.vschedule.app',
      'i.ytimg.com',
      'picsum.photos',
      's3-ap-northeast-1.amazonaws.com',
      'liver-icons.s3.ap-northeast-1.amazonaws.com',
      'liver-icons.s3-ap-northeast-1.amazonaws.com',
    ],
    unoptimized: true,
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
