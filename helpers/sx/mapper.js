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

const manufacturers = [
  "Suzuki",
  "Honda",
  "KTM",
  "Yamaha",
  "Kawasaki",
  "Husqvarna",
  "GASGAS",
];

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

const splitRiderResults = (rider, position) => {
  return {
    number: rider[0],
    name: parsename(rider[1]),
    points: rider[2],
    position,
  };
};

const identifyRiderRaceResults = (results) => {
  let currentRider = [];
  const riderResults = [];
  let x = false;
  let currentPosition = 1;
  results.map((c, i, arr) => {
    if (x) {
      x = false;
      return;
    }

    if (currentRider.length == 4) {
      riderResults.push(splitRiderResults(currentRider, currentPosition));
      currentRider = [];
      currentRider.push(c);
      currentPosition += 1;
      return;
    } else if (i === arr.length - 1) {
      riderResults.push(
        splitRiderResults([...currentRider, c], currentPosition)
      );
      return;
    }
    currentRider.push(c);
  });
  return riderResults;
};

module.exports = (resultString) => identifyRiderRaceResults(resultString);
