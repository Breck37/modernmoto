// const object = {
//   POS: [],
//   number: [],
//   RIDER: [],
//   HOMETOWN: [],
//   BIKE: [],
//   QUAL: [],
//   HOLESHOT: [],
//   START: [],
//   "LAPS LED": [],
//   FINISH: [],
//   POINTS: [],
// };

const manufacturers = ["SUZ", "HON", "KTM", "YAM", "KAW", "HQV", "GAS"];

const parsename = (name) => {
  const splitName = name.split(" ");
  let parsedName;
  splitName.map((nameElement) => {
    manufacturers.map((m) => {
      const reg = new RegExp(m, "gi");
      const replacedBike = nameElement.replace(reg, " ");
      if (nameElement.length > replacedBike.length) {
        parsedName = replacedBike;
      }
    });
  });
  return (splitName[0] += ` ${parsedName}`).trim();
};

const splitRiderResults = (rider, position) => ({
  number: rider[0],
  name: parsename(rider[1]),
  points: rider[2],
  position,
});

const identifyRiderRaceResults = (results) => {
  let currentRider = [];
  const riderResults = [];
  let x = false;
  let currentPosition = 1;
  let finalize = false;
  results
    .filter(
      (r) =>
        r.length === 1 ||
        r.length === 2 ||
        r.length === 3 ||
        !/^\d+$/.test(r.split("X").join(""))
    )
    .map((c, i, arr) => {
      if (riderResults.length >= 40) {
        finalize = true;
      }
      if (finalize) {
        return;
      }
      if (x) {
        x = false;
        return;
      }
      if (currentRider[3] && i === currentRider[3]) {
        riderResults.push(splitRiderResults(currentRider, currentPosition));
        currentRider = [];
        currentPosition += 1;
      }
      if (currentRider.length == 3) {
        currentRider.push(i + 4);
        return;
      } else if (currentRider[3]) {
        return;
      } else if (i === arr.length - 1) {
        riderResults.push(
          splitRiderResults([...currentRider, c], currentPosition)
        );
        currentRider = [];
        return;
      }
      if (c.length > 3 && c.length < 20 && !c.includes(" ")) {
        x = true;
        currentRider.push((c += arr[i + 1]));
        return;
      }

      currentRider.push(c);
    });

  return riderResults.filter(
    (rider) =>
      (rider.points !== "0" && !isNaN(rider.points)) ||
      (Number(rider.points) !== 0 && !isNaN(rider.points))
  );
};

module.exports = (resultString) => identifyRiderRaceResults(resultString);
