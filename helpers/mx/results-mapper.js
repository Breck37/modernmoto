const correctKeys = {
  A: "position",
  BL: "bestLap",
  F: "name",
  L: "currentLap",
  LL: "lastLap",
  N: "number",
  T: "hometown",
  V: "bike",
  D: "diff",
  G: "gap",
  S: "status",
};

module.exports = (riderArray) => {
  return riderArray
    .map((riderObject) => {
      return Object.entries(riderObject.$).reduce((acc, curr) => {
        if (correctKeys[curr[0]]) {
          const key = correctKeys[curr[0]];
          return {
            ...acc,
            [key]: curr[1],
          };
        }
        return acc;
      }, {});
    })
    .sort((a, b) => {
      return a.position - b.position;
    })
    .map((r) => ({ ...r, name: r.name.trim(), bike: r.bike.split(" ")[0] }));
};

////////// EXAMPLE RESPONSE //////////////////////
// A: 1 "Position"
// A1: ""
// A2: ""
// A3: ""
// BL: "50.855" "Best Lap"
// C: "S1" ?
// D: "--.---" "Diff"?
// DIC: "--.---"
// F: "Zach Osborne "
// FD: ""
// G: "--.---" "Gap"?
// GIC: "--.---"
// H: "Clermont, FL" "Hometown"
// I: 350092
// IN: 4 "IN"?
// L: 25 "Laps"
// LL: "54.915" "Last Lap"
// LS: "S1"
// N: "16" "Number"
// P: 0
// PS: 0
// RM: 0
// S: "Active" ?
// SP: "65.555" ?
// SR: [{ SN: "S1", ST: "27.323", MST: 0 }, { SN: "S2", ST: "19.165", MST: 0 }, { SN: "S3", ST: "27.123", MST: 0 }]
// T: "Rockstar Energy Husqvarna Factory Racing" "Team"
// V: "Husqvarna FC450 FE" "Bike"
