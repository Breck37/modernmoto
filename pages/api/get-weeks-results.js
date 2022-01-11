import crawler from "crawler-request";
import currentRound from "../../constants/currentRound";
import scheduledData from "../../constants/scheduledData";
import { lapsMapper } from "../../helpers";
import {
  mapper,
  resultsMapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
} from "../../helpers/sx";

export const getLiveResults = async () =>
  crawler("https://live.amasupercross.com/xml/sx/RaceResults.json")
    .then((response) => {
      if (response && !response.error) {
        const formattedResponse = JSON.parse(response.html);
        const raceResults = resultsMapper(formattedResponse.B);

        const fastestLaps = lapsMapper([...raceResults]);

        return {
          raceResults,
          fastestLaps,
          session: formattedResponse.S,
          round: formattedResponse.T,
          fastLapLeader: fastestLaps ? fastestLaps[0] : null,
        };
      }
    })
    .catch((e) => console.error("/get-live-results", e));

// const getResultDetails = (results) => {
//   const session = results[3].split(" - ")[1];
//   const round = results[11];

//   return { session, round, fastLapLeader: "" };
// };

export default async (req, res) => {
  const url = scheduledData[currentRound.round]?.officialResults;
  const liveResults = await getLiveResults();
  crawler(url)
    .then((response) => {
      if (response.error) {
        res.status(200).send({
          ...liveResults,
          liveResults,
        });
      }
      if (response && !response.error) {
        const formattedResponse = response.text.split("\n");
        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );

        res.status(200).send({
          ...currentRound,
          raceResults,
          seasonResults,
          session: liveResults.session,
          round: liveResults.round,
          liveResults,
        });
      }
    })
    .catch((e) => console.error("/get-live-results", e));
};
