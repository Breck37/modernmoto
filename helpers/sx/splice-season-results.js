const removeLineBreaks = (string) => string.replace(/\n/gi, "");

module.exports = (array) => {
  const season = array.indexOf("SEASON STATISTICS");
  return array
    .splice(season + 1)
    .map(removeLineBreaks)
    .filter(Boolean)
    .splice(18);
};
