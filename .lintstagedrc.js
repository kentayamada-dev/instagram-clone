module.exports = {
  "*": (absolutePaths) => {
    console.log("root-prettier > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier --write ${joinedAbsolutePaths}`];
  },
  "*": (absolutePaths) => {
    console.log("root-cspell > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`cspell --no-must-find-files ${joinedAbsolutePaths}`];
  }
};
