import React from "react";
import { manufacturers } from "../../constants";

export const FastLaps = ({ liveResults }) => {
  return <Presentation liveResults={liveResults} />;
};

const Presentation = ({ liveResults }) => {
  if (liveResults?.fastestLaps?.length > 0)
    return (
      // <div className="marquee">
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
      // </div>
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
                    src={manufacturers[bike.split(" ")[0].toLowerCase()].image}
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
    );
};
