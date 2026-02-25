const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "/cinema",
  assetPrefix: "/cinema",
  images: {
    unoptimized: true,
    domains: ["grumly.ddns.net", "image.tmdb.org", "github.com", "secure.gravatar.com"],
  },
};

module.exports = withPWA(nextConfig);
