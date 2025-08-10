/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.ourastore.com",
      },
      {
        hostname: "client-cdn.bangjeff.com",
      },
      {
        hostname: "www.veinstore.id",
      },
    ],
  },
};

module.exports = nextConfig;
