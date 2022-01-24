const sanitizeBestLaps = (raceResults) => {
  return raceResults.map((result) => {
    const bestLapToSort = result.bestLap.replace(/([.:])/g, "");
    return {
      ...result,
      bestLapToSort,
    };
  });
};

const stripSortedTimeFromObject = (riderObject) => {
  const { bestLapToSort, ...rest } = riderObject;

  return {
    ...rest,
  };
};

const sortRidersByLapTimes = (a, b) => {
  if (Number(a.bestLapToSort) == 0) {
    return -1;
  }

  if (Number(b.bestLapToSort) == 0) {
    return 1;
  }

  return a.bestLapToSort - b.bestLapToSort;
};

export const lapsMapper = (raceResults) => {
  if (!raceResults || !raceResults.length) return [];

  return sanitizeBestLaps(raceResults)
    .sort(sortRidersByLapTimes)
    .map(stripSortedTimeFromObject);
};
