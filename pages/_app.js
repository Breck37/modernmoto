// import App from 'next/app'
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";
import {
  CurrentModeContext,
  CurrentUserContextProvider,
  useAuth,
} from "../hooks";
import { AppStyled } from "../styles";
import "../styles/fonts.css";

function ModernMotoFantasy({ Component, pageProps }) {
  const [currentMode, setCurrentMode] = useState();
  // const [raceResults, setRaceResults] = useState();
  const { user, loading } = useAuth();
  const router = useRouter();
  // const apiRequests = apiType[currentRound.type];

  const isLoginOrLandingPage = useMemo(() => {
    return Boolean(router.pathname === "/login" || router.pathname === "/");
  }, [router.pathname]);

  useEffect(() => {
    if ((!user || !user.email) && !loading) null;

    const mode = localStorage.getItem("USER_CURRENT_MODE");

    if (!mode && mode !== 0 && mode !== 1) {
      localStorage.setItem("USER_CURRENT_MODE", 1);
      setCurrentMode(1);
    } else {
      setCurrentMode(parseInt(localStorage.getItem("USER_CURRENT_MODE")));
    }
  }, []);

  // const getLiveResultsFallBack = useCallback(() => {
  //   axios.get(apiRequests.liveResults).then(({ data }) => {
  //     console.log("LIVE", { data, apiRequests });
  //     setRaceResults(data);
  //   });
  // }, [raceResults]);

  // useEffect(() => {
  //   if (!raceResults) {
  //     axios
  //       .get(apiRequests.weekResults)
  //       .then(({ data }) => {
  //         console.log("WEEK", { data });
  //         setRaceResults(data);
  //       })
  //       .catch((err) => {
  //         console.log("Live Results Error > _app: ", err);
  //         if (!raceResults && apiRequests.liveResults) {
  //           getLiveResultsFallBack();
  //         }
  //       });
  //   }
  // }, [raceResults]);
  // console.log({ raceResults, apiRequests });
  const handleCurrentModeUpdate = () => {
    const currentMode = localStorage.getItem("USER_CURRENT_MODE");

    const modeToSet = parseInt(currentMode) ? 0 : 1;

    setCurrentMode(modeToSet);
    localStorage.setItem("USER_CURRENT_MODE", modeToSet);
  };

  return (
    <AppStyled currentMode={currentMode}>
      <Head>
        <title>ModernMotoFantasy</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Bangers&family=Cinzel:wght@700&family=Kaushan+Script&family=Permanent+Marker&family=Righteous&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CurrentUserContextProvider>
        <CurrentModeContext.Provider value={currentMode}>
          {/* <CurrentRaceResultsProvider raceResults={raceResults}> */}
          {!isLoginOrLandingPage && (
            <Header
              tabs={defaultTabs}
              currentMode={currentMode}
              setCurrentMode={handleCurrentModeUpdate}
              user={user}
            />
          )}
          <Component {...pageProps} user={user} loading={loading} />
          {/* </CurrentRaceResultsProvider> */}
        </CurrentModeContext.Provider>
      </CurrentUserContextProvider>
    </AppStyled>
  );
}

export default ModernMotoFantasy;
