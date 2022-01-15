import crawler from "crawler-request";
import { currentRound, scheduledData } from "../../../constants";
import { lapsMapper, spliceLaps } from "../../../helpers";
import {
  mapper,
  resultsMapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
} from "../../../helpers/sx";

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
//   const session = results[3].split(' - ')[1];
//   const round = results[11];

//   return { session, round, fastLapLeader: '' };
// };

export default async (req, res) => {
  const weekLinks =
    scheduledData[currentRound.type][currentRound.year][currentRound.round];
  const mainUrl = weekLinks?.officialResults;
  const smallMainUrl = weekLinks?.smallBikeOfficialResults;
  const bigBikeLapTimesUrl = weekLinks.bigBikeLapTimes;
  const smallBikeLapTimesUrl = weekLinks.smallBikeLapTimes;

  const liveResults = await getLiveResults();
  await Promise.all([
    crawler(mainUrl),
    crawler(smallMainUrl),
    crawler(bigBikeLapTimesUrl),
    crawler(smallBikeLapTimesUrl),
  ])
    .then((response) => {
      if (response.error) {
        res.status(200).send({
          ...currentRound,
          ...liveResults,
          liveResults,
        });
      }
      const mainResultsBig = response[0];
      const mainResultsSmall = response[1];
      const mainLapsBig = response[2];
      // const mainLapsSmall = response[3];
      if (response && !response.error) {
        // BigBikeLapTimes
        const bigLapFormatted = mainLapsBig.text.split("\n");
        const splicedLaps = spliceLaps(bigLapFormatted);
        // console.log(splicedLaps);

        // SmallbikeLapTimes
        // const smallLapFormatted = mainLapsSmall.text.split("\n");

        // 250 Main Race Results
        const smallFormattedResponse = mainResultsSmall.text.split("\n");
        const smallRaceResults = mapper(
          spliceResults([...smallFormattedResponse], 14)
        );
        const smallSeasonResults = seasonMapper(
          spliceSeasonResults(smallFormattedResponse)
        );

        // 450 Main Race Results
        const formattedResponse = mainResultsBig.text.split("\n");
        const raceResults = mapper(spliceResults([...formattedResponse], 14));
        const seasonResults = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );

        res.status(200).send({
          ...currentRound,
          raceResults: {
            big: raceResults,
            small: smallRaceResults,
          },
          seasonResults: {
            big: seasonResults,
            small: smallSeasonResults,
          },
          lapTimes: {
            big: null,
            small: null,
          },
          session: liveResults.session,
          round: liveResults.round,
          liveResults,
        });
      }
    })
    .catch((e) => console.error("/get-week-results", e));
};
