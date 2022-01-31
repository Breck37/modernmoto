import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useCurrentMode } from "../../../hooks";
// import { MODERN_AQUA, MODERN_DARK } from "../../../styles/colors";

const useStyles = makeStyles(() => ({
  primary: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    backgroundColor: "#fff",
    color: "#454dcc",
    boxShadow: "none",
  },
  secondary: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    backgroundColor: "#282828",
    color: "#fff",
    boxShadow: "none",
  },
  indicatorPrimary: {
    color: "#282828",
  },
  indicatorSecondary: {
    color: "aqua",
  },
}));

const CurrentPicks = ({ picks }) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const { currentMode } = useCurrentMode();
  const classes = useStyles();

  const handleTabChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const bigBikePicks = React.useMemo(() => {
    if (!picks || !picks.bigBikePicks) return null;
    return picks.bigBikePicks;
  }, [picks?.bigBikePicks]);

  const smallBikePicks = React.useMemo(() => {
    if (!picks || !picks.smallBikePicks) return null;
    return picks.smallBikePicks;
  }, [picks?.smallBikePicks]);

  const formatPickPosition = (pick) => {
    switch (pick) {
      case 100:
        return "FL";
      case 101:
        return "FL - M1";
      case 102:
        return "FL - M2";
      default:
        return pick;
    }
  };

  return (
    <Presentation
      bigBikePicks={bigBikePicks}
      smallBikePicks={smallBikePicks}
      formatPickPosition={formatPickPosition}
      currentMode={currentMode}
      classes={classes}
      handleTabChange={handleTabChange}
      currentTab={currentTab}
    />
  );
};

const Presentation = ({
  bigBikePicks,
  smallBikePicks,
  // formatPickPosition,
  currentMode,
  classes,
  handleTabChange,
  currentTab,
}) => {
  console.log({ bigBikePicks, smallBikePicks, currentTab });

  if (!bigBikePicks && !smallBikePicks) {
    return (
      <Container currentMode={currentMode}>
        <div>You have no picks for the current round</div>
      </Container>
    );
  }

  // const renderPicks = (picks) => {
  //   if (!picks) {
  //     return (
  //       <span>{`You have ${
  //         !currentTab ? "250" : "450"
  //       } picks for the current round`}</span>
  //     );
  //   }

  //   return smallBikePicks.map((pick) => {
  //     return (
  //       <Pick key={pick.position} currentMode={currentMode}>
  //         <div>{formatPickPosition(pick.position)}</div>
  //         <div style={{ letterSpacing: "12px", textAlign: "center" }}>
  //           {pick.riderName}
  //         </div>
  //         <div className="points">Pts: {pick.points}</div>
  //       </Pick>
  //     );
  //   });
  // };

  return (
    <Container currentMode={currentMode}>
      <Paper
        square
        className={currentMode ? classes.primary : classes.secondary}
      >
        <ModernTabs
          onChange={handleTabChange}
          value={currentTab}
          currentmode={currentMode}
          className={
            currentMode ? classes.indicatorPrimary : classes.indicatorSecondary
          }
        >
          <Tab label="250" />
          <Tab label="450" />
        </ModernTabs>
      </Paper>
      {/* {currentTab === 1 ? (
        <PicksContainer currentMode={currentMode}>
          <h4>450 PICKS</h4>
          <div className="picks">{renderBigBikePicks()}</div>
        </PicksContainer>
      ) : null}
      {currentTab === 0 ? (
        <PicksContainer currentMode={currentMode}>
          <h4>250 PICKS</h4>
          <div className="picks">
            {renderPicks(!currentTab ? smallBikePicks : bigBikePicks)}
          </div>
        </PicksContainer>
      ) : null} */}
    </Container>
  );
};

export default CurrentPicks;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div:last-child {
    margin-top: 1.5rem;
  }
`;

// const PicksContainer = styled.div`
//   padding: 1rem;
//   margin: 0 1.5rem;
//   border: 1px solid black;
//   border-radius: 0.5rem;
//   color: ${({ currentMode }) => (currentMode ? MODERN_DARK : MODERN_AQUA)};

//   .picks {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-around;
//     flex-wrap: wrap;
//   }
// `;

// const Pick = styled.div`
//   width: 100%;
//   margin-bottom: 0.5rem;

//   hr {
//     color: ${MODERN_DARK};
//   }
//   // min-width: 100px;
//   // width: 103px;
//   // align-items: center;
//   // justify-content: center;
//   // margin-top: 0.5rem;
//   color: ${({ currentMode }) => (currentMode ? MODERN_AQUA : MODERN_DARK)};
//   background-color: ${({ currentMode }) =>
//     currentMode ? MODERN_DARK : MODERN_AQUA};
// `;

const ModernTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "aqua",
  },
});
