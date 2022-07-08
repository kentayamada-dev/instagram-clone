const cspellOptions = "--cache --config cspell.json --no-must-find-files";
const prettierOptions = "--ignore-path .prettierignore --config .prettierrc.json --cache --write";

module.exports = {
  "*": (absolutePaths) => {
    console.log("root > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier ${prettierOptions} ${joinedAbsolutePaths}`, `cspell ${cspellOptions} ${joinedAbsolutePaths}`];
  }
};
