/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produces a self-contained .next/standalone/server.js for Docker / Cloud Run
  output: "standalone",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
