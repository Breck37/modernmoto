const removeUnwantedValues = (lapTime) => {
  return Boolean(
    !lapTime.includes("-") &&
      !lapTime.includes("#") &&
      !(lapTime === "MAX") &&
      !(lapTime === "AVG") &&
      !(lapTime === "KAW") &&
      !(lapTime === "YAM") &&
      !(lapTime === "HON") &&
      !(lapTime === "SUZ") &&
      !(lapTime === "KTM") &&
      !(lapTime === "HUS") &&
      !(lapTime === "HQV")
  );
};

const createRiderResults = (array) => {
  let rider = [];
  const riders = [];

  array
    .map((e) => e.trim())
    .reduce((tempRider, lapDetail) => {
      if (lapDetail === "MIN") {
        riders.push({ ...tempRider });
        rider = [];
        tempRider = {};
        return tempRider;
      }
      if (!rider.length && !tempRider.name) {
        tempRider.name = lapDetail;
        return tempRider;
      }
      if (lapDetail[1] !== ":") {
        const mess = lapDetail.split(":");
        const isDoubleDigits = mess.length > 2;
        tempRider[
          `${isDoubleDigits ? `${mess[0]}${mess[1]}` : mess[0]}`
        ] = lapDetail
          .split("")
          .splice(isDoubleDigits ? 2 : 1)
          .join("");
        return tempRider;
      }
      if (!tempRider.avg) {
        tempRider.avg = lapDetail;
        return tempRider;
      }
      if (!tempRider.max) {
        tempRider.max = lapDetail;
        return tempRider;
      }
      if (!tempRider.min) {
        tempRider.min = lapDetail;
        return tempRider;
      }
      return tempRider;
    }, {});

  const sortedRiders = riders
    .filter((r) => Boolean(r.min && r.name))
    .map((rider) => {
      return {
        name: rider.name,
        bestLap: rider.min.replace(/([.:])/g, ""),
        actualLap: rider.min,
      };
    })
    .sort((a, b) => a.bestLap - b.bestLap)
    .slice(0, 10);

  return sortedRiders;
};

module.exports = (array, index) => {
  if (!Array.isArray(array) || !array.length) {
    return null;
  }
  return createRiderResults(array.splice(index).filter(removeUnwantedValues));
};
