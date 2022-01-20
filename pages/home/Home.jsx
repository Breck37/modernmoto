import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import {
  FastLaps,
  LastRoundDetailed,
  LeagueCard,
  NoAccess,
} from "../../components";
import ModernButton from "../../components/Button/Button";
import { apiType } from "../../constants";
import { useAuth, useCurrentMode, useCurrentUser } from "../../hooks";
import { useRaceResults } from "../../hooks/raceResults";
import { HomeStyled } from "../../styles";

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const { user, loading } = useAuth();
  const currentWeekWithLiveResults = useRaceResults();
  const { currentUser, isLoading, userWithNoAccess } = useCurrentUser(user);
  const apiRequests = apiType[currentWeekWithLiveResults?.type];
  useEffect(() => {
    if ((!user || !user.email) && !loading) {
      router.push("/login");
      return null;
    }

    if (!currentWeekWithLiveResults) return;
  }, [user]);

  const lastRoundDetails = useMemo(() => {
    if (currentUser && currentUser.currentRound.length) {
      const roundToShow =
        currentUser.leaguePicks[currentWeekWithLiveResults?.year][
          currentWeekWithLiveResults?.type
        ][`week${currentWeekWithLiveResults?.leagueRoundToShow}`];

      if (!roundToShow) {
        return currentUser.picks
          .filter((pick) => pick.type === currentWeekWithLiveResults?.type)
          .sort((a, b) => b.week - a.week)[0];
      }

      return roundToShow.find((pick) => pick.email === currentUser.email);
    }

    return null;
  }, [currentUser]);

  const assignPoints = () => {
    axios
      .post(
        `${apiRequests.assignPoints}?week=${currentWeekWithLiveResults?.week}&type=${currentWeekWithLiveResults?.type}&year=${currentWeekWithLiveResults?.year}`,
        {
          raceResults: {
            ...currentWeekWithLiveResults?.pdfResults,
          },
        }
      )
      .then((res) => {
        console.log("ASSIGN POINTS RESPONSE", { res });
      })
      .catch((e) => console.warn("ERROR", { e }));
  };

  if (userWithNoAccess) {
    <NoAccess data={userWithNoAccess} />;
  }

  if (
    loading ||
    isLoading ||
    (!currentWeekWithLiveResults.loading &&
      !currentWeekWithLiveResults.liveResults) ||
    !user ||
    !currentUser
  ) {
    return <CircularProgress />;
  }

  const {
    liveResults,
    pdfResults,
    week,
    year,
    message,
  } = currentWeekWithLiveResults;
  return (
    <HomeStyled currentMode={currentMode}>
      {user.email === process.env.ADMIN_USER &&
      pdfResults &&
      pdfResults.raceResults ? (
        <ModernButton label="Assign Points" onClick={assignPoints} />
      ) : null}
      <LastRoundDetailed week={week} year={year} details={lastRoundDetails} />
      {currentUser?.leaguePicks?.length &&
        currentUser.leaguePicks.map((leaguePick) => {
          return (
            <LeagueCard
              key={`${Object.keys(leaguePick)[0]}`}
              leaguePicks={leaguePick}
            />
          );
        })}
      <FastLaps liveResults={liveResults} s />
      {message && <div className="user-details">{message}</div>}
    </HomeStyled>
  );
};

export default Home;
