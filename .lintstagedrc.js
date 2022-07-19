const cspellOptions = "--cache --config cspell.json --no-must-find-files";
const prettierOptions = "--ignore-path .prettierignore --config .prettierrc.json --cache --write";

module.exports = {
  "!(yarn.lock|package.json)*": (absolutePaths) => {
    console.log("root > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`, `cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  },
  "package.json": (absolutePaths) => {
    console.log("root > package.json", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`sort-package-json ${joinedAbsolutePaths}`, `prettier ${prettierOptions} ${joinedAbsolutePaths}`];
  }
};
