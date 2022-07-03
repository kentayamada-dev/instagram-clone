module.exports = {
  "*.!(*gitignore)": (absolutePaths) => {
    console.log("root > *.!(*gitignore)", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier --write ${joinedAbsolutePaths}`];
  },
  "*": (absolutePaths) => {
    console.log("root > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`cspell ${joinedAbsolutePaths} --no-must-find-files`];
  }
};
