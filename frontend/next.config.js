/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/job-scheduler' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/job-scheduler/' : '',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? process.env.NEXT_PUBLIC_API_URL + '/api/:path*'
          : 'http://localhost:3001/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
