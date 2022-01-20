import { CircularProgress, Table } from "@material-ui/core";
import React, { useState } from "react";
import { RiderRow } from "../../components/RiderRow";
import { manufacturers } from "../../constants";
import { useCurrentMode } from "../../hooks/currentMode";
import { useRaceResults } from "../../hooks/raceResults";
import { ResultsStyled } from "../../styles";

const Results = () => {
  const [currentRider, setCurrentRider] = useState(null);
  const raceResults = useRaceResults();
  const { currentMode } = useCurrentMode();

  const handleClickedRider = (rider) => {
    setCurrentRider(rider);
  };

  const TableHeaderRow = {
    position: "Pos",
    riderName: "Rider Name",
    team: "Team",
    bestLap: "Best Lap",
    lastLap: "Last Lap",
    number: "#",
    currentLap: "Lap",
    bike: "Bike",
  };

  if (!raceResults || !raceResults.liveResults) {
    return <CircularProgress />;
  }

  if (raceResults.message) {
    return (
      <ResultsStyled currentMode={currentMode}>
        <div className="round-details">{raceResults.message}</div>
      </ResultsStyled>
    );
  }

  return (
    <ResultsStyled
      currentMode={currentMode}
      fastLapLeaderLegend={
        manufacturers[
          raceResults.liveResults.fastLapLeader.bike.split(" ")[0].toLowerCase()
        ]?.rgb
      }
    >
      <main>
        <div className="round-details">
          <h1>{raceResults.liveResults.round}</h1>
          <h2>{`Week: ${raceResults.week}`}</h2>
          <h4>{raceResults.liveResults.session.split(" - ")[0]}</h4>
        </div>
        <div className="fastest-key">
          <div className="color-sample" />
          <span>Fastest Lap</span>
          <span className="fast-lap-info">{`${raceResults.liveResults.fastLapLeader.riderName} - ${raceResults.liveResults.fastLapLeader.bestLap}`}</span>
        </div>
        {raceResults && raceResults.liveResults.raceResults.length ? (
          <Table
            rows={raceResults.liveResults.raceResults}
            hasOverlay
            currentRow={currentRider}
            setCurrentRow={() => setCurrentRider(null)}
          >
            <RiderRow rider={TableHeaderRow} row={0} />
            {raceResults.liveResults.raceResults
              .sort((a, b) => a.position - b.position)
              .map((riderResult, row) => {
                const highlight =
                  riderResult.riderName ===
                  raceResults.liveResults.fastLapLeader.rider
                    ? manufacturers[
                        raceResults.liveResults.fastLapLeader.bike.toLowerCase()
                      ]?.rgb
                    : false;

                return (
                  <RiderRow
                    key={`${riderResult.position}-${riderResult.number}`}
                    rider={riderResult}
                    row={(row += 2)}
                    onClick={() => handleClickedRider(riderResult)}
                    highlight={highlight}
                  />
                );
              })}
          </Table>
        ) : null}
      </main>
    </ResultsStyled>
  );
};

export default Results;
