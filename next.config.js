/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'cdn-stage.hasti.co',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dartil.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
