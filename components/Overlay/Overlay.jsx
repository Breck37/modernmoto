import React from "react";
import Icon from "../../icons/Icon";

const Overlay = ({ showOverlay, currentRider, handleClick }) => {
  if (!showOverlay) return null;
  return (
    <div className="overlay">
      <div className="icon-wrap" onClick={handleClick}>
        <Icon name="close" color="#fff" size="32" />
      </div>
      <div className="overlay-content">
        <div className="rider">{currentRider.name}</div>
      </div>
    </div>
  );
};

export default Overlay;
