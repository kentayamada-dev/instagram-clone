module.exports = {
  "*.!(*gitignore)": (absolutePaths) => {
    console.log("root-prettier > *.!(*gitignore)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier --write ${joinedAbsolutePaths}`];
  },
  "*": (absolutePaths) => {
    console.log("root-cspell > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`cspell ${joinedAbsolutePaths} --no-must-find-files`];
  }
};
