module.exports = {
  "*": (absolutePaths) => {
    const joinedAbsolutePaths = absolutePaths.join(" ");
    return [
      `prettier --write ${joinedAbsolutePaths}`,
      `cspell ${joinedAbsolutePaths} --no-must-find-files`,
    ];
  },
};
