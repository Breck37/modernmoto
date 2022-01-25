import React from "react";

const CurrentPicks = ({ currentRound }) => {
  console.log({ currentRound });
  return <Presentation />;
};

const Presentation = () => {
  return (
    <div>
      {/* CurrentPicks
      {currentRound?.length ? (
        currentRound?.map()
      ) : ( */}
      <div>You have no current picks</div>
      {/* )} */}
    </div>
  );
};

export default CurrentPicks;
