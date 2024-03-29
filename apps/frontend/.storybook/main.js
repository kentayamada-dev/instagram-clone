const isDevelopment = process.env["NODE_ENV"] === "development";
const SITE_URL = "https://app.instagram-clone.net";

module.exports = {
  ...(isDevelopment ? { staticDirs: ["../public"] } : {}),
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
    "storybook-addon-next",
    "storybook-react-i18next",
    "@storybook/addon-a11y"
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
      <meta content="/favicon/site-tile-70x70.png" name="msapplication-square70x70logo">
      <meta content="/favicon/site-tile-150x150.png" name="msapplication-square150x150logo">
      <meta content="/favicon/site-tile-310x150.png" name="msapplication-wide310x150logo">
      <meta content="/favicon/site-tile-310x310.png" name="msapplication-square310x310logo">
      <meta content="#0078d7" name="msapplication-TileColor">
      <link href="/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon">
      <link href="/favicon.ico" rel="icon" type="image/vnd.microsoft.icon">
      <link href="/favicon/apple-touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57">
      <link href="/favicon/apple-touch-icon-60x60.png" rel="apple-touch-icon" sizes="60x60">
      <link href="/favicon/apple-touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72">
      <link href="/favicon/apple-touch-icon-76x76.png" rel="apple-touch-icon" sizes="76x76">
      <link href="/favicon/apple-touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114">
      <link href="/favicon/apple-touch-icon-120x120.png" rel="apple-touch-icon" sizes="120x120">
      <link href="/favicon/apple-touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
      <link href="/favicon/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152">
      <link href="/favicon/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180">
      <link href="/favicon/android-chrome-36x36.png" rel="icon" sizes="36x36" type="image/png">
      <link href="/favicon/android-chrome-48x48.png" rel="icon" sizes="48x48" type="image/png">
      <link href="/favicon/android-chrome-72x72.png" rel="icon" sizes="72x72" type="image/png">
      <link href="/favicon/android-chrome-96x96.png" rel="icon" sizes="96x96" type="image/png">
      <link href="/favicon/android-chrome-128x128.png" rel="icon" sizes="128x128" type="image/png">
      <link href="/favicon/android-chrome-144x144.png" rel="icon" sizes="144x144" type="image/png">
      <link href="/favicon/android-chrome-152x152.png" rel="icon" sizes="152x152" type="image/png">
      <link href="/favicon/android-chrome-192x192.png" rel="icon" sizes="192x192" type="image/png">
      <link href="/favicon/android-chrome-256x256.png" rel="icon" sizes="256x256" type="image/png">
      <link href="/favicon/android-chrome-384x384.png" rel="icon" sizes="384x384" type="image/png">
      <link href="/favicon/android-chrome-512x512.png" rel="icon" sizes="512x512" type="image/png">
      <link href="/favicon/icon-36x36.png" rel="icon" sizes="36x36" type="image/png">
      <link href="/favicon/icon-48x48.png" rel="icon" sizes="48x48" type="image/png">
      <link href="/favicon/icon-72x72.png" rel="icon" sizes="72x72" type="image/png">
      <link href="/favicon/icon-96x96.png" rel="icon" sizes="96x96" type="image/png">
      <link href="/favicon/icon-128x128.png" rel="icon" sizes="128x128" type="image/png">
      <link href="/favicon/icon-144x144.png" rel="icon" sizes="144x144" type="image/png">
      <link href="/favicon/icon-152x152.png" rel="icon" sizes="152x152" type="image/png">
      <link href="/favicon/icon-160x160.png" rel="icon" sizes="160x160" type="image/png">
      <link href="/favicon/icon-192x192.png" rel="icon" sizes="192x192" type="image/png">
      <link href="/favicon/icon-196x196.png" rel="icon" sizes="196x196" type="image/png">
      <link href="/favicon/icon-256x256.png" rel="icon" sizes="256x256" type="image/png">
      <link href="/favicon/icon-384x384.png" rel="icon" sizes="384x384" type="image/png">
      <link href="/favicon/icon-512x512.png" rel="icon" sizes="512x512" type="image/png">
      <link href="/favicon/icon-16x16.png" rel="icon" sizes="16x16" type="image/png">
      <link href="/favicon/icon-24x24.png" rel="icon" sizes="24x24" type="image/png">
      <link href="/favicon/icon-32x32.png" rel="icon" sizes="32x32" type="image/png">
      <link href="/favicon/manifest.json" rel="manifest">
      <meta content="Instagram Clone Storybook" name="title">
      <meta content="This is an Instagram Clone Storybook." name="description">
      <meta content="index, follow" name="robots">
      <meta content="text/html; charset=utf-8" httpEquiv="Content-Type">
      <meta content="English" name="language">
      <meta content="3 days" name="revisit-after">
      <meta content="Kenta Yamada" name="author">
      <meta content="website" property="og:type">
      <meta content="${SITE_URL}/storybook/" property="og:url">
      <meta content="Instagram Clone Storybook" property="og:title">
      <meta content="This is an Instagram Clone Storybook." property="og:description">
      <meta content="${SITE_URL}/static/instagram/image.jpg" property="og:image">
      <meta content="summary_large_image" property="twitter:card">
      <meta content="${SITE_URL}/storybook/" property="twitter:url">
      <meta content="Instagram Clone Storybook" property="twitter:title">
      <meta content="This is an Instagram Clone Storybook." property="twitter:description">
      <meta content="${SITE_URL}/static/instagram/image.jpg" property="twitter:image">
    `;
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-i18next": "react-i18next"
    };
    return config;
  }
};
