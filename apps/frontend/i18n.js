const hoistNonReactStatics = require("hoist-non-react-statics");

module.exports = {
  locales: ["en", "ja"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["form"],
    "/signup": ["form"]
  },
  staticsHoc: hoistNonReactStatics,
  loadLocaleFrom: (lang, ns) =>
    import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default)
};
