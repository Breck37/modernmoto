import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { apiType, currentRound } from "../constants";

export const useRaceResults = () => {
  const apiRequests = apiType[currentRound.type];
  const [raceResults, setRaceResults] = useState(null);

  const getLiveResultsFallBack = useCallback(() => {
    axios.get(apiRequests.liveResults).then(({ data }) => {
      setRaceResults(data);
    });
  }, [raceResults]);

  useEffect(() => {
    if (!raceResults) {
      axios
        .get(apiRequests.weekResults)
        .then(({ data }) => {
          setRaceResults(data);
        })
        .catch(() => {
          if (!raceResults && apiRequests.liveResults) {
            getLiveResultsFallBack();
          }
        });
    }
  }, [raceResults]);
  console.log({ raceResults, apiRequests });

  console.log("IN HOOK", { raceResults });

  return raceResults;
};
