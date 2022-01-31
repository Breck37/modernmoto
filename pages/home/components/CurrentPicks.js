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

const ModernTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "aqua",
  },
});
