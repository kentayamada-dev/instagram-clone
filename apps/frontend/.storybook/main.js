module.exports = {
  stories: [
    {
      directory: "../src/components",
      files: "**/index.stories.tsx"
    }
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-interactions",
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
  staticDirs: ["."],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-i18next": "react-i18next"
    };
    return config;
  }
};
