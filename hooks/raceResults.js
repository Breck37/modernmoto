import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { apiType, currentRound } from "../constants";

export const useRaceResults = () => {
  const apiRequests = apiType[currentRound.type];
  const [raceResults, setRaceResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLiveResultsFallBack = useCallback(() => {
    axios.get(apiRequests.liveResults).then(({ data }) => {
      setLoading(false);
      setRaceResults(data);
    });
  }, [raceResults]);

  useEffect(() => {
    if (!raceResults) {
      setLoading(true);
      axios
        .get(apiRequests.weekResults)
        .then(({ data }) => {
          setRaceResults(data);
          setLoading(false);
        })
        .catch(() => {
          if (!raceResults && apiRequests.liveResults) {
            getLiveResultsFallBack();
          }
        });
    }
  }, [raceResults]);

  return { ...(raceResults ?? {}), loading };
};
