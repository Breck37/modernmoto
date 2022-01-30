module.exports = (array, index) => {
  const raceResults = array.splice(index);

  const indexToCut = raceResults.indexOf("SEASON STATISTICS");

  if (indexToCut !== -1) {
    return raceResults.splice(0, indexToCut);
  }
  return raceResults;
};
