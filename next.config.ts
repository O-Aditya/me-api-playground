import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL
          ? `${process.env.API_URL.startsWith('http') ? process.env.API_URL : `https://${process.env.API_URL}`}/api/:path*`
          : 'http://localhost:3001/api/:path*',
      },
    ]
  },
};

export default nextConfig;
