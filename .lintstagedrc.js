module.exports = {
  "*": (absolutePaths) => {
    console.log("root > *", absolutePaths);
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [`prettier --write ${joinedAbsolutePaths}`, `cspell ${joinedAbsolutePaths} --no-must-find-files`];
  }
};
