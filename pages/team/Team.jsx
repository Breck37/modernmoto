import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, WeeklyPicks } from "../../components";
import {
  useAuth,
  useCurrentMode,
  useCurrentRound,
  useCurrentUser,
  useIsMountedRef,
} from "../../hooks";
import { TeamStyled } from "../../styles";

// TODO create league select

const WeeklyPicksController = ({ isActive, children }) => {
  if (!isActive) return null;

  return <>{children}</>;
};

const Team = () => {
  // hooks
  const isMounted = useIsMountedRef();
  const currentRound = useCurrentRound();
  const { currentMode } = useCurrentMode();
  const { user, loading: userLoading } = useAuth();
  const { currentUser } = useCurrentUser(user);

  // state
  const [league, setLeague] = useState("");
  const [selectedRiders, setSelectedRiders] = useState();
  const [entries, setEntries] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [canShowQualifying, setCanShowQualifying] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(""), 1500);
    }
    if (!isMounted.current) return;
    if (entries && Object.keys(entries).length) return;

    axios
      .get(
        `/api/check-entry-list?round=${currentRound.round}&year=${currentRound.year}&type=${currentRound.type}`
      )
      .then((res) => {
        setLoading(false);
        setEntries(res.data.riders);
      })
      .catch((err) => console.warn("ENTRY ERROR", err));
  }, [success, entries]);

  const qualifyingCanBeShown = useCallback(async (url) => {
    return await fetch(url, { method: "get" }).then(function (status) {
      return status.ok;
    });
  });

  useEffect(async () => {
    if (!canShowQualifying && loading && currentRound) {
      try {
        const result = await qualifyingCanBeShown(
          currentRound.bigBikeQualifying
        );
        if (result) {
          setCanShowQualifying(true);
        }

        setLoading(false);
      } catch (e) {
        console.log("Error getting qualifying results", e);
      }
    }
  }, [canShowQualifying, loading, currentRound]);
  const selectedBigBikeRiders = useMemo(() => {
    if (!selectedRiders || !selectedRiders.big) return null;
    const riderNames = [];
    return selectedRiders.big
      .map((rider) => {
        const indexOfRiderName = riderNames.indexOf(rider.riderName);
        if (
          rider.position === 100 ||
          rider.position === 101 ||
          rider.position === 102 ||
          indexOfRiderName === -1
        ) {
          riderNames.push(rider.riderName);
          return { ...rider, error: "" };
        }
        return {
          ...rider,
          error: `Please change pick #${indexOfRiderName + 1}`,
        };
      })
      .sort((a, b) => a.position - b.position);
  }, [selectedRiders]);

  const selectedSmallBikeRiders = useMemo(() => {
    if (!selectedRiders || !selectedRiders.small) return null;
    const riderNames = [];
    return selectedRiders.small
      .map((rider) => {
        const indexOfRiderName = riderNames.indexOf(rider.riderName);
        if (
          rider.position === 100 ||
          rider.position === 101 ||
          rider.position === 102 ||
          indexOfRiderName === -1
        ) {
          riderNames.push(rider.riderName);
          return { ...rider, error: "" };
        }
        return {
          ...rider,
          error: `Please change pick #${indexOfRiderName + 1}`,
        };
      })
      .sort((a, b) => a.position - b.position);
  }, [selectedRiders]);

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

  if (loading || userLoading) {
    return <CircularProgress />;
  }

  // return (
  //   <TeamStyled currentMode={currentMode}>
  //     <div className="unavailable">
  //       {beginningText || "Window to make picks has closed"}
  //     </div>
  //   </TeamStyled>
  // );

  return (
    <TeamStyled currentMode={currentMode}>
      <Paper square>
        <Tabs
          onChange={handleTabChange}
          value={currentTab}
          indicatorColor="primary"
        >
          <Tab label="250" />
          <Tab label="450" />
        </Tabs>
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
                        // style={getStyles(leagueToPick, riderName, theme)}
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
          {canShowQualifying ? (
            <Link href={qualifyingContent.link} passHref>
              <a href="" target="_blank">
                <h3>{qualifyingContent.label}</h3>
              </a>
            </Link>
          ) : (
            <h3>{qualifyingContent.label}</h3>
          )}
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
