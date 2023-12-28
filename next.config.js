/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    deviceSizes: [360, 512],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-dev.hasti.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-test.hasti.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'assets.hasti.co',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
