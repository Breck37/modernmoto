import crawler from 'crawler-request';
import { parseStringPromise } from 'xml2js';
import currentRound from '../../../constants/currentRound';
import scheduledData from '../../../constants/scheduledData';
import {
  mapper,
  seasonMapper,
  spliceResults,
  spliceSeasonResults,
  resultsMapper,
  spliceLaps,
} from '../../../helpers/mx';
import { lapsMapper } from '../../../helpers/mx';

export const getLiveResults = async () => {
  const result = await crawler(
    `http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml?R=${new Date().getTime()}`
  )
    .then(async (response) => {
      if (response && !response.error) {
        const formattedResponse = await parseStringPromise(response.html);
        const raceResults = resultsMapper(formattedResponse.A.B);
        const fastestLaps = lapsMapper([...raceResults]);
        return {
          raceResults,
          fastestLaps,
          session: formattedResponse.A.$.S,
          roundTitle: formattedResponse.A.$.T,
          fastLapLeader: fastestLaps ? fastestLaps[0] : null,
        };
      }
    })
    .catch((e) => console.error('/get-live-results', e));
  return result;
};

const checkErrors = (response) => {
  if (!Array.isArray(response)) {
    return response.error;
  }
  return response.reduce(
    (result, resEl) => {
      if (resEl.error) {
        (result.hasError = true), (result.error = resEl.error);
      }
      return result;
    },
    {
      hasError: false,
      error: null,
    }
  );
};

export const getFastestLapResults = async (roundLinks) => {
  const fastLapResults = {};
  return await Promise.all([
    crawler(roundLinks.bigBikeLapTimesMoto1),
    crawler(roundLinks.bigBikeLapTimesMoto2),
    crawler(roundLinks.smallBikeLapTimesMoto1),
    crawler(roundLinks.smallBikeLapTimesMoto2),
  ]).then((response) => {
    const [
      { text: bigBikeLapTimesMoto1 },
      { text: bigBikeLapTimesMoto2 },
      { text: smallBikeLapTimesMoto1 },
      { text: smallBikeLapTimesMoto2 },
    ] = response;
    const splitBigBikeLapTimesMoto1 = bigBikeLapTimesMoto1?.split('\n');
    const splitBigBikeLapTimesMoto2 = bigBikeLapTimesMoto2?.split('\n');
    const splitSmallBikeLapTimesMoto1 = smallBikeLapTimesMoto1?.split('\n');
    const splitSmallBikeLapTimesMoto2 = smallBikeLapTimesMoto2?.split('\n');
    // console.log({ smallBikeLapTimesMoto2 });

    const errors = checkErrors(response);
    if (errors.hasError) {
      console.log('ERROR IN LAPTIMES', errors.error);
      return [];
    }
    if (splitBigBikeLapTimesMoto1) {
      fastLapResults.bigBikeLapTimesMoto1 = spliceLaps(
        splitBigBikeLapTimesMoto1,
        10
      );
    }
    if (splitBigBikeLapTimesMoto2) {
      fastLapResults.bigBikeLapTimesMoto2 = spliceLaps(
        splitBigBikeLapTimesMoto2,
        10
      );
    }
    if (splitSmallBikeLapTimesMoto1) {
      fastLapResults.smallBikeLapTimesMoto1 = spliceLaps(
        splitSmallBikeLapTimesMoto1,
        10
      );
    }
    if (splitSmallBikeLapTimesMoto2) {
      fastLapResults.smallBikeLapTimesMoto2 = spliceLaps(
        splitSmallBikeLapTimesMoto2,
        10
      );
    }
    return fastLapResults;
  });
};

// const getResultDetails = (results) => {
//   const session = results[3].split(' - ')[1];
//   const round = results[11];

//   return { session, round, fastLapLeader: '' };
// };

export default async (req, res) => {
  const roundLinks = scheduledData[currentRound.round];
  const liveResults = await getLiveResults();

  if (!roundLinks) {
    res.status(200).send({
      ...liveResults,
      liveResults,
    });
    return;
  }

  await Promise.all([
    crawler(roundLinks.officialResults),
    crawler(roundLinks.smallBikeOfficialResults),
  ])
    .then(async (resultResponse) => {
      const [bigResponse, smallResponse] = resultResponse;

      if (bigResponse.error || smallResponse.error) {
        res.status(200).send({
          ...liveResults,
          liveResults,
          bogResponseError: bigResponse.error,
          smallResponseError: smallResponse.error,
        });
        return;
      }

      const raceResults = {};
      const fastLapResults = await getFastestLapResults(roundLinks);
      const seasonResults = {};
      if (bigResponse) {
        const formattedResponse = bigResponse.text.split('\n');
        raceResults.big = mapper(spliceResults([...formattedResponse], 14));
        seasonResults.big = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );
      }
      if (smallResponse) {
        const formattedResponse = smallResponse.text.split('\n');
        raceResults.small = mapper(spliceResults([...formattedResponse], 14));
        seasonResults.small = seasonMapper(
          spliceSeasonResults(formattedResponse)
        );
      }

      res.status(200).send({
        pdfResults: {
          raceResults,
          seasonResults,
          fastLapResults,
        },
        liveResults,
      });
    })
    .catch((e) => console.error('Error /get-week-results', { e }));
};
