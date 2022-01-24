import manufacturers from "../constants/manufacturers";

const testRiderNumber = (string) => string.includes("#");

const testIsBike = (string) => manufacturers[string?.toLowerCase()];

const trim = (string) => string.trim();

const testSpace = (string) => string.includes(" ");

const hasAllAttributes = (rider) =>
  rider.name && rider.number && rider.bike && rider.times.length;

const filter = (string) => {
  return (
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
    !string.includes("AVG") &&
    string.length > 1 &&
    string.trim().replace(/\s/g, "").slice(-1) !== "I"
  );
};

// DEFAULT RIDER
// const defaultCurrentRider = {
//   name: "",
//   number: "",
//   bike: {},
//   times: [],
// };

const cleanse = ({ times, ...rest }) => {
  const [avg, max, min] = times.slice(times.length - 3);
  const cleansed = times.slice(1, times.length - 3).map((time, i) => {
    return i <= 8 ? time.slice(1) : time.slice(2);
  });

  return {
    ...rest,
    times: cleansed,
    min,
    max,
    avg,
  };
};

const sanitizeBestLaps = (raceResults) => {
  return raceResults.map((riderWithTimes) => {
    const bestLapToSort = riderWithTimes.min.replace(/([.:])/g, "");
    return {
      ...riderWithTimes,
      bestLapToSort,
    };
  });
};

export const spliceLaps = (lapArray) => {
  const finalResults = [];

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
          let newRider = { times: [] };
          if (testRiderNumber(entry)) {
            newRider.number = entry;
          } else if (testIsBike(entry)) {
            newRider.bike = testIsBike(entry);
          } else if (testSpace(entry)) {
            currentRider.name = entry;
          }
          return newRider;
        }

        return currentRider;
      },
      { times: [] }
    );

  return sanitizeBestLaps(finalResults.map(cleanse)).sort((a, b) => {
    if (Number(a.bestLapToSort) == 0) {
      return -1;
    }

    if (Number(b.bestLapToSort) == 0) {
      return 1;
    }

    return a.bestLapToSort - b.bestLapToSort;
  });
};
