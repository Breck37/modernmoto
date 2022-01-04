import React, { createContext, useContext } from "react";
import { apiType, scheduledData } from "../constants";

const CurrentRoundContext = createContext({ currentRound: null });

export const useCurrentRound = () => {
  const currentRound = useContext(CurrentRoundContext);
  const activeRound =
    scheduledData[currentRound.type][currentRound.year][currentRound.round];
  const apiRequests = apiType[currentRound.type];

  return { ...currentRound, ...activeRound, apiRequests };
};

export default function CurrentRoundContextProvider({
  children,
  currentRound,
}) {
  return (
    <CurrentRoundContext.Provider value={currentRound}>
      {children}
    </CurrentRoundContext.Provider>
  );
}
