import { Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import styled from "styled-components";
import { manufacturers } from "../../constants";
import currentRound from "../../constants/currentRound";
import scheduledData from "../../constants/scheduledData";
import { useCurrentMode } from "../../hooks";

const useStyles = makeStyles(() => ({
  primary: {
    backgroundColor: "#fff",
    color: "#454dcc",
  },
  secondary: {
    backgroundColor: "#282828",
    color: "#fff",
  },
  indicatorPrimary: {
    color: "#282828",
  },
  indicatorSecondary: {
    color: "aqua",
  },
}));

export const FastLaps = ({ liveResults }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { currentMode } = useCurrentMode();
  const classes = useStyles();
  const apiRequests =
    scheduledData[currentRound.type][currentRound.year][currentRound.round];

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  // request confirm

  return (
    <Presentation
      liveResults={liveResults}
      handleTabChange={handleTabChange}
      currentTab={currentTab}
      currentMode={currentMode}
      classes={classes}
    />
  );
};

const Presentation = ({
  liveResults,
  handleTabChange,
  currentTab,
  currentMode,
  classes,
}) => {
  if (liveResults?.fastestLaps?.length > 0)
    return (
      <Wrap>
        <Paper
          square
          className={currentMode ? classes.primary : classes.secondary}
        >
          <ModernTabs
            onChange={handleTabChange}
            value={currentTab}
            currentMode={currentMode}
            className={
              currentMode
                ? classes.indicatorPrimary
                : classes.indicatorSecondary
            }
          >
            <Tab label="250" />
            <Tab label="450" />
          </ModernTabs>
        </Paper>
        {/* // <div className="marquee">
      //   <div className="animation-container">
      //     <span>FAST LAPS</span>
      //     {liveResults.fastestLaps.map(
      //       ({ riderName, bestLap, bike }, index) => {
      //         return (
      //           <div
      //             key={`${riderName}-fast-lap`}
      //             className={`fast-lap ${index}`}
      //           >
      //             <img
      //               src={manufacturers[bike.toLowerCase()].image}
      //               alt=""
      //               className="rider-image"
      //             />
      //             <div>{riderName}</div>
      //             <div>{bestLap}</div>
      //           </div>
      //         );
      //       }
      //     )}
      //   </div>
      // </div> */}
        <div className="mobile-fast-laps">
          <h3>Top 3 LapTimes</h3>
          {liveResults.fastestLaps
            .slice(0, 3)
            .map(({ riderName, bestLap, bike }, index) => {
              console.log({ manufacturers, bike });
              return (
                <div
                  key={`${riderName}-fast-lap`}
                  className={`fast-lap ${index}`}
                >
                  {bike && (
                    <img
                      src={
                        manufacturers[bike.split(" ")[0].toLowerCase()].image
                      }
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
      </Wrap>
    );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  '& .MuiPaper-root': {
    background-color: ${({ currentMode }) =>
      currentMode ? "#fff" : "#282828"} !important;
  }

  '& .PrivateTabIndicator-root-1': {
    background-color: ${({ currentMode }) =>
      currentMode ? "#454dcc" : "aqua"} !important;
  }

  '> div:first-child': {
    width: 20rem;
  },
`;

const ModernTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "aqua",
  },
});
