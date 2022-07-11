const { merge } = require("webpack-merge");

const prefix = process.env.STORYBOOK_PREFIX ? `/${process.env.STORYBOOK_PREFIX}` : "";

module.exports = {
  stories: [
    {
      directory: "../src/components",
      files: "**/index.stories.tsx"
    }
  ],
  addons: [
    "@chakra-ui/storybook-addon",
    "@storybook/addon-essentials",
    "storybook-addon-turbo-build",
    "storybook-addon-apollo-client",
    "storybook-addon-next",
    "storybook-react-i18next"
  ],
  features: {
    storyStoreV7: true
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
    lazyCompilation: true,
    options: {
      fsCache: true
    }
  },
  refs: {
    "@chakra-ui/react": { disable: true }
  },
  managerHead: (head) => {
    return `
      ${head}
      <link href="${prefix}/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="${prefix}/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="${prefix}/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link href="${prefix}/favicon/site.webmanifest" rel="manifest" />
      <link color="#5bbad5" href="${prefix}/favicon/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="Instagram Clone" name="apple-mobile-web-app-title" />
      <meta content="Instagram Clone" name="application-name" />
      <meta content="#da532c" name="msapplication-TileColor" />
      <meta content="#ffffff" name="theme-color" />
    `;
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-i18next": "react-i18next"
    };
    return merge(config, {
      output: {
        publicPath: `${prefix}/`
      }
    });
  }
};
