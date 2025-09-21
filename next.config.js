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

module.exports = nextConfig;
