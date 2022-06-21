const { i18n } = require("./next-i18next.config");

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
  },
  i18n
};

module.exports = nextConfig;
