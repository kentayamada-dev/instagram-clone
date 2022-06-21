const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"]
  },
  reloadOnPrerender: process.env.NODE_ENV === "development" ? true : false
};
