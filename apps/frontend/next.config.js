/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  async rewrites() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html"
      }
    ];
  }
};

module.exports = nextTranslate(nextConfig);
