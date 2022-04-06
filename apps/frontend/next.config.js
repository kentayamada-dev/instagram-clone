/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

const nextConfig = {
  reactStrictMode: true,
  distDir: "dist",
  trailingSlash: true,
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
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://instagram-clone-kentayamada-dev.vercel.app/"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,DELETE"
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  }
};

module.exports = nextTranslate(nextConfig);
