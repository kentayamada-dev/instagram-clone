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
    "storybook-addon-next-router",
    "@storybook/preset-scss",
    "storybook-addon-apollo-client"
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5"
  },
  refs: {
    "@chakra-ui/react": { disable: true }
  },
  staticDirs: ["."]
};
