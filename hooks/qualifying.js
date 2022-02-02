import axios from "axios";
import React from "react";
import currentRound from "../constants/currentRound";
import scheduledData from "../constants/scheduledData";

export const useQualifying = () => {
  const [loading, setLoading] = React.useState(true);
  const [entries, setEntries] = React.useState([]);
  const [canShowQualifying, setCanShowQualifying] = React.useState(false);
  const currentRoundApi =
    scheduledData[currentRound.type][currentRound.year][currentRound.round];

  React.useEffect(() => {
    if (entries && Object.keys(entries).length && !loading) return;
    axios
      .get(
        `/api/check-entry-list?round=${currentRound.round}&year=${currentRound.year}&type=${currentRound.type}`
      )
      .then((res) => {
        setLoading(false);
        setEntries(res.data.riders);
      })
      .catch((err) => console.warn("ENTRY ERROR", err));
  });

  const qualifyingCanBeShown = React.useCallback(async (url) => {
    return await fetch(url, { method: "get" }).then(function (status) {
      return status.ok;
    });
  });

  React.useEffect(async () => {
    if (!canShowQualifying && loading && currentRound) {
      try {
        const result = await qualifyingCanBeShown(
          currentRoundApi.bigBikeQualifying
        );
        if (result) {
          setCanShowQualifying(true);
        }

        setLoading(false);
      } catch (e) {
        console.log("Error getting qualifying results", e);
      }
    }
  }, [canShowQualifying, loading, currentRound]);

  return {
    entries,
    loading,
    canShowQualifying,
  };
};
