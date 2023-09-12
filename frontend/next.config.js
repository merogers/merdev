/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/my-screenshots-391716/**',
      },
    ],
  },
};

module.exports = nextConfig;
