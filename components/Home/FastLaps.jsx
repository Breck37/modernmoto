import React from "react";
import styled from "styled-components";
import { useCurrentMode } from "../../hooks";
import { MODERN_AQUA, MODERN_DARK } from "../../styles/colors";

export const FastLaps = ({ lapResults, currentTab }) => {
  const { currentMode } = useCurrentMode();
  //const apiRequests =
  // scheduledData[currentRound.type][currentRound.year][currentRound.round];

  if (!lapResults) {
    <Container currentMode={currentMode}>
      <span>No laps to display</span>
    </Container>;
  }

  const leaderToDisplay = React.useMemo(
    () =>
      currentTab
        ? lapResults["450"]?.fastLapLeader
        : lapResults["250"]?.fastestLaps,
    [currentTab, lapResults]
  );

  console.log({ leaderToDisplay, lapResults });

  return (
    <Presentation leaderToDisplay={leaderToDisplay} currentMode={currentMode} />
  );
};

const Presentation = ({ leaderToDisplay, currentMode }) => {
  if (!leaderToDisplay) {
    return (
      <Container currentMode={currentMode}>
        <span>No laps to display</span>
      </Container>
    );
  }
  return (
    <Container currentMode={currentMode}>
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
        {/* <h3>Top 3 LapTimes</h3> */}
        {/* {lapsToDisplay
          ?.slice(0, 3)
          .map(({ riderName, bestLap, bike }, index) => {
            return (
              <div
                key={`${riderName}-fast-lap`}
                className={`fast-lap ${index}`}
              >
                {bike && (
                  <img src={bike.image} alt="" className="rider-image" />
                )}
                <div>{riderName}</div>
                <div>{bestLap}</div>
              </div>
            );
          })} */}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  "& .muipaper-root": {
    background-color: ${({ currentMode }) =>
      currentMode ? "#fff" : "#282828"} !important;
  }

  "& .privatetabindicator-root-1": {
    background-color: ${({ currentMode }) =>
      currentMode ? "#454dcc" : "aqua"} !important;
  }

  "> div:first-child": {
    width: 20rem;
  }

  ,
  .mobile-fast-laps {
    color: ${({ currentMode }) => (currentMode ? MODERN_DARK : MODERN_AQUA)};
  }
`;
