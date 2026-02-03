import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, WeeklyPicks } from "../../components";
import { QualifyingLink } from "../../components/Team";
import {
  useAuth,
  useCurrentMode,
  useCurrentRound,
  useCurrentUser,
  useQualifying,
} from "../../hooks";
import { TeamStyled } from "../../styles";

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

const WeeklyPicksController = ({ isActive, children }) => {
  if (!isActive) return null;

  return <>{children}</>;
};

const Team = () => {
  // hooks
  const currentRound = useCurrentRound();
  const { currentMode } = useCurrentMode();
  const { user, loading: userLoading } = useAuth();
  const { currentUser } = useCurrentUser(user);

  // state
  const [league, setLeague] = useState("");
  const [selectedRiders, setSelectedRiders] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [success, setSuccess] = useState("");

  const { entries, loading, canShowQualifying } = useQualifying();

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(""), 1500);
    }
  }, [success]);

  useEffect(() => {
    if (!currentUser || !currentUser.currentRound) return;
    if (selectedRiders) return;

    setSelectedRiders({
      big: currentUser.currentRound.bigBikePicks,
      small: currentUser.currentRound.smallBikePicks,
    });
  }, [currentUser, selectedRiders]);

  const validateSelectedRiders = (size) => {
    if (!selectedRiders || !selectedRiders[size]) return null;
    const names = [];
    return selectedRiders[size]
      .map((rider) => {
        const riderIndex = names.findIndex((name) => {
          return rider.name === name;
        });
        console.log({ selectedRiders, riderIndex, rider, names });

        if (
          rider.position === 100 ||
          rider.position === 101 ||
          rider.position === 102 ||
          riderIndex === -1
        ) {
          names.push(rider.name);
          return { ...rider, error: "" };
        }

        return {
          ...rider,
          error: `Please change pick #${riderIndex + 1}`,
        };
      })
      .sort((a, b) => a.position - b.position);
  };

  const selectedBigBikeRiders = React.useMemo(
    () => validateSelectedRiders("big"),
    []
  );
  const selectedSmallBikeRiders = React.useMemo(
    () => validateSelectedRiders("small"),
    [selectedRiders?.small]
  );

  const isDisabled = useMemo(() => {
    const classTeamIsSet = currentRound.type === "sx" ? 7 : 8;
    return (
      selectedBigBikeRiders?.length !== classTeamIsSet &&
      selectedSmallBikeRiders?.length !== classTeamIsSet
    );
  }, [selectedSmallBikeRiders, selectedBigBikeRiders]);

  const qualifyingContent = useMemo(() => {
    const classSize = currentTab === 0 ? "250" : "450";
    if (!canShowQualifying) {
      return {
        label: `${classSize} Qualifying Not yet Completed`,
        link: "",
      };
    }
    switch (currentTab) {
      case 1:
        return {
          label: `${classSize} Qualfying Results`,
          link: currentRound.bigBikeQualifying,
        };
      case 0:
      default:
        return {
          label: `${classSize} Qualfying Results`,
          link: currentRound.smallBikeQualifying,
        };
    }
  }, [currentTab, canShowQualifying]);

  const removeErrors = (riders) => {
    if (!riders?.length) return [];
    return riders.map(({ error, ...rest }) => ({ ...rest }));
  };

  const saveUserPicks = () => {
    const cleansedBigBikeSelectedRiders = removeErrors(selectedRiders.big);
    const cleansedSmallBikeSelectedRiders = removeErrors(selectedRiders.small);
    const params = JSON.stringify({
      week: currentRound.week,
      round: currentRound.round,
      email: user.email,
      user: currentUser.username,
      bigBikePicks: cleansedBigBikeSelectedRiders,
      smallBikePicks: cleansedSmallBikeSelectedRiders,
      totalPoints: 0,
      league: league || "League of Extraordinary Bros",
      type: currentRound.type,
      deadline: currentRound.deadline,
      rank: null,
    });

    axios
      .post("/api/save-picks", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setSuccess("Saved picks successfully!");
        setSelectedRiders([]);
      })
      .catch((err) => console.error(err));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (loading || userLoading || !currentUser?.leagues) {
    return <CircularProgress />;
  }

  // return (
  //   <TeamStyled currentMode={currentMode}>
  //     <div className="unavailable">
  //       {beginningText || "Window to make picks has closed"}
  //     </div>
  //   </TeamStyled>
  // );
  console.log({ currentUser });
  return (
    <TeamStyled currentMode={currentMode}>
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
      <div className="team-container">
        <div className="select-container">
          {currentUser &&
          Array.isArray(currentUser.leagues) &&
          currentUser.leagues.length ? (
            <>
              <FormControl>
                <InputLabel id="League">League:</InputLabel>
                <Select
                  labelId="League"
                  name="League"
                  label="League:"
                  id="league-select"
                  value={league || ""}
                  onChange={(evt) => {
                    setLeague(evt.target.value);
                  }}
                  className="roboto"
                >
                  {currentUser.leagues.map((leagueToPick) => {
                    return (
                      <MenuItem
                        key={leagueToPick}
                        // style={getStyles(leagueToPick, name, theme)}
                        value={leagueToPick}
                        className="roboto"
                        disabled={league === leagueToPick}
                      >
                        {`${leagueToPick}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className="button-container">
                <Button
                  label="Save Team"
                  small
                  onClick={saveUserPicks}
                  disabled={isDisabled}
                  className="team-save-button"
                />

                {success && (
                  <div className="team-submit-success">
                    <Alert variant="filled" severity="success">
                      {success}
                    </Alert>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>Loading Leagues...</div>
          )}

          <QualifyingLink
            canShowQualifying={canShowQualifying}
            qualifyingContent={qualifyingContent}
          />
        </div>
        <WeeklyPicksController isActive={currentTab == 0}>
          <WeeklyPicks
            classType="small"
            riders={entries.smallBike}
            selectedRiders={{
              big: selectedBigBikeRiders,
              small: selectedSmallBikeRiders,
            }}
            setSelectedRiders={setSelectedRiders}
          />
        </WeeklyPicksController>
        <WeeklyPicksController isActive={currentTab == 1}>
          <WeeklyPicks
            classType="big"
            riders={entries.bigBike}
            selectedRiders={{
              big: selectedBigBikeRiders,
              small: selectedSmallBikeRiders,
            }}
            setSelectedRiders={setSelectedRiders}
          />
        </WeeklyPicksController>
      </div>
    </TeamStyled>
  );
};

export default Team;

const ModernTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "aqua",
  },
});
