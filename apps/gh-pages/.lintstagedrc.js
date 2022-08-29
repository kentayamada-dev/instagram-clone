const prettierOptions = "--ignore-path .prettierignore --config .prettierrc.json --cache --write";
const cspellOptions = "--cache --config cspell.json --no-must-find-files";

module.exports = {
  "!package.json": (absolutePaths) => {
    console.log("apps/gh-pages > !package.json", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`, `cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  },
  "package.json": (absolutePaths) => {
    console.log("apps/gh-pages > package.json", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`sort-package-json ${joinedAbsolutePaths}`, `prettier ${prettierOptions} ${joinedAbsolutePaths}`];
  }
};
