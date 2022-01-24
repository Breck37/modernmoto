const mapper = require("./mapper");
const spliceResults = require("./splice-results");
const spliceSeasonResults = require("./splice-season-results");
const seasonMapper = require("./season-mapper");
const resultsMapper = require("./results-mapper");
const { lapsMapper } = require("../live-results-laps-mapper");
const { pdfLapsMapper } = require("../pdf-laps-mapper");

module.exports = {
  mapper,
  spliceResults,
  spliceSeasonResults,
  seasonMapper,
  resultsMapper,
  lapsMapper,
  pdfLapsMapper,
};
