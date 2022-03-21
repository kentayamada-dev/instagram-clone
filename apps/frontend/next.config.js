/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  trailingSlash: true,
  i18n,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
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

module.exports = nextConfig;
