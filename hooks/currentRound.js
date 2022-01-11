import { apiType, currentRound, scheduledData } from "../constants";

export const useCurrentRound = () => {
  const activeRound =
    scheduledData[currentRound.type][currentRound.year][currentRound.round];
  const apiRequests = apiType[currentRound.type];

  return { ...currentRound, ...activeRound, apiRequests };
};
