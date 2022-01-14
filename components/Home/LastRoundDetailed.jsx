import React from "react";

const LastRoundDetailed = ({ details, week, year }) => {
  return <Presentation week={week} year={year} details={details} />;
};

const Presentation = ({ week, year, details }) => {
  if (!details) return null;
  return (
    <div className="user-details">
      <h1>{`Current Round: ${week}`}</h1>
      <h2>{`Season: ${year}`}</h2>
      <h2>{`${details.type[0].toUpperCase() + details.type[1]}  Round ${
        details.week
      } Score: ${details.totalPoints}`}</h2>
      <h2>{`${details.type[0].toUpperCase() + details.type[1]} Round ${
        details.week
      } Rank: ${details.rank}`}</h2>
    </div>
  );
};

export default LastRoundDetailed;
