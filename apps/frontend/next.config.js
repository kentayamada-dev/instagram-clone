const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer =
  process.env.ANALYZE === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;

const nextConfig = {
  i18n,
  distDir: "dist",
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  async rewrites() {
    return [
      {
        destination: "/storybook/index.html",
        source: "/storybook"
      }
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
