// const sanitizeBestLaps = (raceResults) => {
//   return raceResults.map((result) => {
//     const bestLapToSort = result.bestLap.replace(/([.:])/g, "");
//     return {
//       ...result,
//       bestLapToSort,
//     };
//   });
// };

// const stripSortedTimeFromObject = (riderObject) => {
//   const { bestLapToSort, ...rest } = riderObject;

//   return {
//     ...rest,
//   };
// };

// const sortRidersByLapTimes = (a, b) => {
//   if (Number(a.bestLapToSort) == 0) {
//     return -1;
//   }

//   if (Number(b.bestLapToSort) == 0) {
//     return 1;
//   }

//   return a.bestLapToSort - b.bestLapToSort;
// };

// bestLap: "48.867"
// bike: "Kawasaki KX450SR"
// currentLap: 26
// hometown: "Rio Rancho, NM"
// lastLap: "53.892"
// number: "21"
// position: 9
// riderName: "Jason Anderson"
// team: "Monster Energy Kawasaki"

export const pdfLapsMapper = (splicedLaps) => {
  if (!splicedLaps || !splicedLaps.length) return [];

  console.log({ splicedLaps });
  return splicedLaps;

  // return sanitizeBestLaps(raceResults).sort(sortRidersByLapTimes).map(stripSortedTimeFromObject);
};
