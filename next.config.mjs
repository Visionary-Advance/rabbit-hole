/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'items-images-sandbox.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'items-images-production.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.builder.io',
        pathname: '/**',
      },
    ],
    domains: ["api.builder.io", "cdn.builder.io"],
  },
};

export default nextConfig;
