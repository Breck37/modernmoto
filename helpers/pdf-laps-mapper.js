export const pdfLapsMapper = (splicedLaps) => {
  if (!splicedLaps || !splicedLaps.length) return [];

  return splicedLaps.map((rider) => {
    return {
      name: rider.name,
      bestLap: rider.min,
      number: rider.number,
      bike: rider.bike,
      avgLap: rider.avg,
      worstLap: rider.max,
    };
  });
};
