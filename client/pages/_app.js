// import App from 'next/app'
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import axios from "axios";
import {
  CurrentModeContext,
  CurrentRoundContextProvider,
  CurrentUserContextProvider,
  CurrentRaceResultsProvider,
} from "../hooks";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";
import { AppStyled } from "../styles";
import { useRouter } from "next/router";
import "../styles/fonts.css";
import { currentRound } from "../constants";

function ModernMotoFantasy({ Component, pageProps }) {
  const [currentMode, setCurrentMode] = useState();
  const [raceResults, setRaceResults] = useState();
  const router = useRouter();

  const isLoginOrLandingPage = useMemo(() => {
    return Boolean(router.pathname === "/login" || router.pathname === "/");
  }, [router.pathname]);

  useEffect(() => {
    const mode = localStorage.getItem("USER_CURRENT_MODE");

    if (!mode && mode !== 0 && mode !== 1) {
      localStorage.setItem("USER_CURRENT_MODE", 1);
      setCurrentMode(1);
    } else {
      setCurrentMode(parseInt(localStorage.getItem("USER_CURRENT_MODE")));
    }
  }, []);

  const getLiveResultsFallBack = useCallback(() => {
    axios.get("/api/get-live-results").then(({ data }) => {
      setRaceResults(data);
    });
  }, []);

  useEffect(() => {
    if (!raceResults) {
      axios
        .get("/api/get-weeks-results")
        .then(({ data }) => {
          console.log({ data });
          setRaceResults(data);
        })
        .catch((err) => {
          console.log("Live Results Error: ", err);
          getLiveResultsFallBack();
        });
    }
  }, [raceResults]);

  const handleCurrentModeUpdate = () => {
    const currentMode = localStorage.getItem("USER_CURRENT_MODE");

    const modeToSet = parseInt(currentMode) ? 0 : 1;

    setCurrentMode(modeToSet);
    localStorage.setItem("USER_CURRENT_MODE", modeToSet);
  };

  return (
    <UserProvider>
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
            {!isLoginOrLandingPage && (
              <Header
                tabs={defaultTabs}
                currentMode={currentMode}
                setCurrentMode={handleCurrentModeUpdate}
              />
            )}
            <CurrentRoundContextProvider currentRound={currentRound}>
              <CurrentRaceResultsProvider raceResults={raceResults}>
                <Component
                  {...pageProps}
                  setCurrentMode={handleCurrentModeUpdate}
                />
              </CurrentRaceResultsProvider>
            </CurrentRoundContextProvider>
          </CurrentModeContext.Provider>
        </CurrentUserContextProvider>
      </AppStyled>
    </UserProvider>
  );
}

ModernMotoFantasy.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default ModernMotoFantasy;
