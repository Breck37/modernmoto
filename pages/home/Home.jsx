import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useCurrentMode, useAuth } from '../../hooks';
import { useRaceResults } from '../../hooks/raceResults';
import { NoAccess, LeagueCard } from '../../components';
import { HomeStyled } from '../../styles';
import { manufacturers, apiType } from '../../constants';
import ModernButton from '../../components/Button/Button';

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const currentWeekWithLiveResults = useRaceResults();
  const { user, loading } = useAuth();
  const [userWithPicks, setUserWithPicks] = useState(null);
  const [userWithNoAccess, setUserWithNoSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiRequests = apiType[currentWeekWithLiveResults.type];

  useEffect(() => {
    if ((!user || !user.email) && !loading) {
      setUserWithPicks(null);
      router.push('/login');
      return null;
    }

    if (user && user?.email && !userWithPicks && !isLoading) {
      axios
        .get(
          `${apiRequests.getUser}/${user?.email}?type=${currentWeekWithLiveResults.type}`
        )
        .then(({ data: userData }) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);

          if (userData.success) {
            setUserWithPicks(userData.user);
            return;
          }

          setUserWithNoSuccess(userData);
        })
        .catch((e) => console.log('Error getting user > Home', e));
      return;
    }
  }, [user, userWithPicks]);

  const lastRoundDetails = useMemo(() => {
    if (userWithPicks && userWithPicks.picks.length) {
      const roundToShow =
        userWithPicks.leaguePicks[currentWeekWithLiveResults.year][
          currentWeekWithLiveResults.type
        ][`week${currentWeekWithLiveResults.leagueRoundToShow}`];

      if (!roundToShow) {
        return userWithPicks.picks
          .filter((pick) => pick.type === currentWeekWithLiveResults.type)
          .sort((a, b) => b.week - a.week)[0];
      }

      return roundToShow.find((pick) => pick.email === userWithPicks.email);
    }

    return null;
  }, [userWithPicks]);

  const assignPoints = () => {
    axios
      .post(
        `${apiRequests.assignPoints}?week=${currentWeekWithLiveResults.week}&type=${currentWeekWithLiveResults.type}&year=${currentWeekWithLiveResults.year}`,
        {
          raceResults: {
            ...currentWeekWithLiveResults.pdfResults,
          },
        }
      )
      .then((res) => {
        console.log('ASSIGN POINTS RESPONSE', { res });
      })
      .catch((e) => console.warn('ERROR', { e }));
  };

  if (userWithNoAccess) {
    <NoAccess data={userWithNoAccess} />;
  }

  if (
    loading ||
    isLoading ||
    !currentWeekWithLiveResults ||
    !user ||
    !userWithPicks
  ) {
    return <CircularProgress />;
  }

  const {
    liveResults,
    pdfResults,
    week,
    year,
    type,
    leagueRoundToShow,
    message,
  } = currentWeekWithLiveResults;

  return (
    <HomeStyled currentMode={currentMode}>
      {user.email === process.env.ADMIN_USER &&
      pdfResults &&
      pdfResults.raceResults ? (
        <ModernButton label="Assign Points" onClick={assignPoints} />
      ) : null}
      {lastRoundDetails && (
        <div className="user-details">
          <h1>{`Current Round: ${week}`}</h1>
          <h2>{`Season: ${year}`}</h2>
          <h2>{`${
            lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]
          }  Round ${lastRoundDetails.week} Score: ${
            lastRoundDetails.totalPoints
          }`}</h2>
          <h2>{`${
            lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]
          } Round ${lastRoundDetails.week} Rank: ${lastRoundDetails.rank}`}</h2>
        </div>
      )}
      <LeagueCard
        leaguePicks={
          userWithPicks.leaguePicks[year][type][`week${leagueRoundToShow}`]
        }
      />
      {!message && liveResults.fastestLaps.length > 0 ? (
        <>
          {/* <div className="marquee">
            <div className="animation-container">
              <span>FAST LAPS</span>
              {liveResults.fastestLaps.map(
                ({ riderName, bestLap, bike }, index) => {
                  return (
                    <div
                      key={`${riderName}-fast-lap`}
                      className={`fast-lap ${index}`}
                    >
                      <img
                        src={manufacturers[bike.toLowerCase()].image}
                        alt=""
                        className="rider-image"
                      />
                      <div>{riderName}</div>
                      <div>{bestLap}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div> */}
          <div className="mobile-fast-laps">
            <h3>Top 3 LapTimes</h3>
            {liveResults.fastestLaps
              .slice(0, 3)
              .map(({ riderName, bestLap, bike }, index) => {
                return (
                  <div
                    key={`${riderName}-fast-lap`}
                    className={`fast-lap ${index}`}
                  >
                    {bike && (
                      <img
                        src={manufacturers[bike.toLowerCase()].image}
                        alt=""
                        className="rider-image"
                      />
                    )}
                    <div>{riderName}</div>
                    <div>{bestLap}</div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="user-details">{message}</div>
      )}
      <main>
        <h1 className="title"></h1>
      </main>
    </HomeStyled>
  );
};

export default Home;
