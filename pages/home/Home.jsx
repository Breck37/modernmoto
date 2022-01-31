import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { FastLaps, NoAccess } from "../../components";
import {
  useAuth,
  useCurrentMode,
  useCurrentUser,
  useRaceResults,
} from "../../hooks";
import CurrentPicks from "./components/CurrentPicks";

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const { user, loading } = useAuth();
  const currentWeekWithLiveResults = useRaceResults();
  const { currentUser, isLoading, userWithNoAccess } = useCurrentUser(user);
  // const apiRequests = apiType[currentWeekWithLiveResults?.type];
  useEffect(() => {
    if ((!user || !user.email) && !loading) {
      router.push("/login");
      return null;
    }

    if (!currentWeekWithLiveResults) return;
  }, [user]);

  // const lastRoundDetails = useMemo(() => {
  //   if (currentUser && currentUser.currentRound.length) {
  //     const roundToShow =
  //       currentUser.leaguePicks[currentWeekWithLiveResults?.year][
  //         currentWeekWithLiveResults?.type
  //       ][`week${currentWeekWithLiveResults?.leagueRoundToShow}`];

  //     if (!roundToShow) {
  //       return currentUser.picks
  //         .filter((pick) => pick.type === currentWeekWithLiveResults?.type)
  //         .sort((a, b) => b.week - a.week)[0];
  //     }

  //     return roundToShow.find((pick) => pick.email === currentUser.email);
  //   }

  //   return null;
  // }, [currentUser]);

  // const assignPoints = () => {
  //   axios
  //     .post(
  //       `${apiRequests.assignPoints}?week=${currentWeekWithLiveResults?.week}&type=${currentWeekWithLiveResults?.type}&year=${currentWeekWithLiveResults?.year}`,
  //       {
  //         raceResults: {
  //           ...currentWeekWithLiveResults?.pdfResults,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("ASSIGN POINTS RESPONSE", { res });
  //     })
  //     .catch((e) => console.warn("ERROR", { e }));
  // };

  if (
    loading ||
    isLoading ||
    (!currentWeekWithLiveResults.loading &&
      !currentWeekWithLiveResults.liveResults) ||
    !user ||
    !currentUser
  ) {
    return (
      <HomeStyled currentMode={currentMode}>
        <CircularProgress />
      </HomeStyled>
    );
  }

  if (userWithNoAccess) {
    return (
      <HomeStyled currentMode={currentMode}>
        <NoAccess data={userWithNoAccess} />
      </HomeStyled>
    );
  }

  // const {
  //   liveResults,
  //   pdfResults,
  //   week,
  //   year,
  //   message,
  // } = currentWeekWithLiveResults;
  console.log({ currentUser });
  return (
    <Presentation
      currentMode={currentMode}
      userWithPicks={currentUser}
      results={currentWeekWithLiveResults}
    />
  );
};

export const Presentation = ({
  currentMode,
  userWithPicks,
  results,
  // lastRoundDetails,
  // pdfResults,
  // liveResults,
}) => {
  console.log({ currentMode, userWithPicks, results });
  return (
    <HomeStyled currentMode={currentMode}>
      <TeamContainer>
        <CurrentPicks picks={userWithPicks?.currentRound} />
      </TeamContainer>
      <RightContainer>
        <FastLaps lapResults={results} />
      </RightContainer>
      {/* {user.email === process.env.ADMIN_USER &&
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
    {message && <div className="user-details">{message}</div>} */}
    </HomeStyled>
  );
};

export default Home;

const HomeStyled = styled.div`
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 990px) {
    flex-direction: row;
    padding: 0 2rem;
  }
`;

const TeamContainer = styled.section`
  width: 100%;
  flex: 1;
  padding: 1rem 1.5rem;
  text-align: center;
`;

const RightContainer = styled.section`
  flex: 1;
`;
