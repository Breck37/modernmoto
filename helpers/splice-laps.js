import manufacturers from "../constants/manufacturers";

const testRiderNumber = (string) => string.includes("#");

const testIsBike = (string) => manufacturers[string?.toLowerCase()];

const trim = (string) => string.trim();

const testSpace = (string) => string.includes(" ");

const hasAllAttributes = (rider) =>
  rider.name && rider.number && rider.bike && rider.times.length;

const filter = (string) =>
  string &&
  !string.includes("450SX") &&
  !string.includes("250SX") &&
  !string.includes("INDIVIDUAL") &&
  !string.includes("AMA") &&
  !string.includes("page") &&
  !string.includes("ROUND") &&
  !string.includes("MONSTER") &&
  !string.includes(" - ") &&
  !string.includes("MIN") &&
  !string.includes("MAX") &&
  !string.includes("AVG");

export const spliceLaps = (lapArray) => {
  const finalResults = [];
  const defaultCurrentRider = {
    name: "",
    number: "",
    bike: {},
    times: [],
  };
  let currentRider = defaultCurrentRider;
  lapArray
    .splice(9)
    .filter(filter)
    .map(trim)
    .reduce(
      (currentRider, entry) => {
        if (testRiderNumber(entry) && !currentRider.number) {
          currentRider.number = entry;
          return currentRider;
        } else if (testIsBike(entry) && !currentRider?.bike?.color) {
          currentRider.bike = testIsBike(entry);
          return currentRider;
        } else if (testSpace(entry) && !currentRider.name) {
          currentRider.name = entry;
          return currentRider;
        } else if (!isNaN(parseInt(entry)) && !testRiderNumber(entry)) {
          currentRider.times = [...currentRider.times, entry];
          return currentRider;
        } else if (hasAllAttributes(currentRider)) {
          finalResults.push(currentRider);
          console.log({ currentRider });
          let newRider = { times: [] };
          if (testRiderNumber(entry)) {
            newRider.number = entry;
          } else if (testIsBike(entry)) {
            newRider.bike = testIsBike(entry);
          } else if (testSpace(entry)) {
            currentRider.name = entry;
          }
          console.log({ newRider });
          return newRider;
        }

        return currentRider;
      },
      { times: [] }
    );

  return finalResults;
};
