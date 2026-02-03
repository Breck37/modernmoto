import { Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useCurrentMode } from "../../hooks";

const paperStyles = {
  primary: {
    backgroundColor: "#fff",
    color: "#454dcc",
  },
  secondary: {
    backgroundColor: "#282828",
    color: "#fff",
  },
};

const indicatorStyles = {
  primary: {
    color: "#282828",
  },
  secondary: {
    color: "aqua",
  },
};

export const FastLaps = ({ liveResults }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { currentMode } = useCurrentMode();
  //const apiRequests =
  // scheduledData[currentRound.type][currentRound.year][currentRound.round];

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Presentation
      liveResults={liveResults?.fastestLaps}
      handleTabChange={handleTabChange}
      currentTab={currentTab}
      currentMode={currentMode}
    />
  );
};

const Presentation = ({
  liveResults,
  handleTabChange,
  currentTab,
  currentMode,
}) => {
  const lapsToDisplay = currentTab ? liveResults?.big : liveResults?.small;

  return (
    <Wrap>
      <Paper
        square
        sx={currentMode ? paperStyles.primary : paperStyles.secondary}
      >
        <ModernTabs
          onChange={handleTabChange}
          value={currentTab}
          currentmode={currentMode}
          sx={currentMode ? indicatorStyles.primary : indicatorStyles.secondary}
        >
          <Tab label="250" />
          <Tab label="450" />
        </ModernTabs>
      </Paper>
      {/* // <div className="marquee">
     //   <div className="animation-container">
     //     <span>FAST LAPS</span>
     //     {liveResults.fastestLaps.map(
       //       ({ name, bestLap, bike }, index) => {
         //         return (
           //           <div
           //             key={`${name}-fast-lap`}
           //             className={`fast-lap ${index}`}
           //           >
           //             <img
           //               src={manufacturers[bike.toLowerCase()].image}
           //               alt=""
           //               className="rider-image"
           //             />
           //             <div>{name}</div>
           //             <div>{bestLap}</div>
           //           </div>
           //         );
           //       }
           //     )}
           //   </div>
         // </div> */}
      <div className="mobile-fast-laps">
        <h3>Top 3 LapTimes</h3>
        {lapsToDisplay?.slice(0, 3).map(({ name, bestLap, bike }, index) => {
          return (
            <div key={`${name}-fast-lap`} className={`fast-lap ${index}`}>
              {bike && <img src={bike.image} alt="" className="rider-image" />}
              <div>{name}</div>
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
