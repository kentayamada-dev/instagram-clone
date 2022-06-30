const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  distDir: "dist",
  reactStrictMode: true,
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

module.exports = nextConfig;
