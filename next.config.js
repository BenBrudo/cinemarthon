/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "",
  assetPrefix: "",
  images: {
    unoptimized: true,
    domains: ["cinemarthon.fr", "image.tmdb.org", "github.com", "secure.gravatar.com"],
  },
};

module.exports = nextConfig;
