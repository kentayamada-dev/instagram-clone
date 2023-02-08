const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer =
  process.env["ANALYZE"] === "true" ? require("@next/bundle-analyzer")({ enabled: true }) : (config) => config;

module.exports = withBundleAnalyzer({
  i18n,
  distDir: "dist",
  reactStrictMode: true,
  swcMinify: false, // incompatible with browser-image-compression
  trailingSlash: true,
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    dangerouslyAllowSVG: true,
    domains: ["picsum.photos", "res.cloudinary.com"],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        destination: "/storybook/index.html",
        source: "/storybook"
      }
    ];
  },
  experimental: {
    scrollRestoration: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
});
