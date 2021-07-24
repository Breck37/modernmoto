import React, { useMemo } from 'react';
import LeagueCardStyled from './LeagueCardStyled';

const LeagueCard = ({ leaguePicks = [] }) => {
  const hasLeaguePicks = useMemo(() => {
    return Boolean(leaguePicks && leaguePicks.length);
  }, [leaguePicks]);

  const renderPoints = (label, pickPoints) => {
    if (!pickPoints) return null;

    return (
      <h4>
        {label}: {pickPoints}
      </h4>
    );
  };

  if (!hasLeaguePicks) {
    return (
      <LeagueCardStyled>
        <div className="no-picks">No picks were made last week</div>
      </LeagueCardStyled>
    );
  }

  return (
    <LeagueCardStyled>
      {leaguePicks.map((pick) => {
        return (
          <div key={pick.user} className="pick">
            <h1>{pick.user}</h1>
            <h2>Total: {pick.totalPoints}</h2>
            {renderPoints('450', pick.bigBikePoints)}
            {renderPoints('250', pick.smallBikePoints)}
            {pick.bigBikePicks
              .sort((a, b) => a.position - b.position)
              .map((rider) => {
                return (
                  <div className="rider-row" key={rider.position}>
                    <h5>
                      <b>
                        {rider.position === 100
                          ? 'FL: '
                          : `${rider.position}: `}
                      </b>
                      {rider.riderName}
                    </h5>
                    <h6>{rider.points}</h6>
                  </div>
                );
              })}
          </div>
        );
      })}
    </LeagueCardStyled>
  );
};

export default LeagueCard;
