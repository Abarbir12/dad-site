/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production builds
  swcMinify: true,
  // Optimize image handling
  images: {
    unoptimized: true
  },
  // Strict mode for better development
  reactStrictMode: true,
};

export default nextConfig;
