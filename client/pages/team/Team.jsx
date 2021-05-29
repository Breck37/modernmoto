import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Alert from '@material-ui/lab/Alert';
import {
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { Button, WeeklyPicks } from '../../components';
import {
  useIsMountedRef,
  useCurrentUser,
  useCurrentRound,
  useCurrentMode,
  useAuth,
} from '../../hooks';
import { TeamStyled } from '../../styles';

// TODO create league select

const Team = () => {

  // hooks
  const isMounted = useIsMountedRef();
  const currentRound = useCurrentRound();
  const { currentMode } = useCurrentMode();
  const { user, loading: userLoading } = useAuth()
  const { currentUser } = useCurrentUser(user?.email);

  // state
  const [league, setLeague] = useState('');
  const [selectedRiders, setSelectedRiders] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canShowQualifying, setCanShowQualifying] = useState(false);
  const [success, setSuccess] = useState('');

  const picksUnavailable =
    currentRound.submissionEnd < new Date() ||
    currentRound.submissionStart > new Date();

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(''), 1500);
    }
    if (!isMounted.current) return;
    if (entries && entries.length) return;

    if (picksUnavailable) {
      setLoading(false);
      return;
    }

    axios
      .get(`/api/check-entry-list?week=${currentRound.week}`)
      .then((res) => {
        setLoading(false);
        setEntries(res.data.riders);
      })
      .catch((err) => console.error('ENTRY ERROR', err));
  }, [success, entries]);

  const qualifyingCanBeShown = useCallback(async (url) => {
    return await fetch(url, { method: 'get' }).then(function (status) {
      return status.ok;
    });
  });
  console.log({
    new: new Date(),
    tz: new Date().getTimezoneOffset(),
    currentRound,
    end: currentRound.submissionEnd < new Date(),
    start: currentRound.submissionStart > new Date(),
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
      } catch (e) {
        console.log('Error getting qualifying results', e);
      }
    }
  }, [canShowQualifying, loading, currentRound]);

  const selectedRidersWithErrors = useMemo(() => {
    if (!selectedRiders || !selectedRiders?.length) return [];
    const riderNames = [];
    return selectedRiders.map((rider) => {
      const indexOfRiderName = riderNames.indexOf(rider.riderName);
      if (rider.position === 100 || indexOfRiderName === -1) {
        riderNames.push(rider.riderName);
        return { ...rider, error: '' };
      }
      return {
        ...rider,
        error: `Please change pick #${indexOfRiderName + 1}`,
      };
    });
  }, [selectedRiders]).sort((a, b) => a.position - b.position);

  const isDisabled = useMemo(() => {
    if (
      !selectedRiders ||
      !selectedRiders?.length ||
      selectedRidersWithErrors.length !== 7
    )
      return true;
    return selectedRidersWithErrors.reduce(
      (result, currentRider) => (currentRider.error ? true : false),
      false
    );
  });

  const removeErrors = (riders) => {
    return riders.map(({ error, ...rest }) => ({ ...rest }));
  };

  const saveUserPicks = () => {
    const cleanseSelectedRiders = removeErrors(selectedRiders);

    const params = JSON.stringify({
      email: user.email,
      user: currentUser.username,
      bigBikePicks: cleanseSelectedRiders,
      week: currentRound.round,
      totalPoints: 0,
      league: league || 'League of Extraordinary Bros',
    });

    axios
      .post('/api/save-picks', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setSuccess('Saved picks successfully!');
        setSelectedRiders([]);
      })
      .catch((err) => console.error(err));
  };

  if (loading || userLoading) {
    return <CircularProgress />;
  }

  if (picksUnavailable) {
    const beginningText =
      currentRound.submissionStart > new Date()
        ? 'Window to make picks is not yet open'
        : null;
    return (
      <TeamStyled currentMode={currentMode}>
        <div className="unavailable">
          {beginningText || 'Window to make picks has closed'}
        </div>
      </TeamStyled>
    );
  }

  return (
    <TeamStyled currentMode={currentMode}>
      <div className="team-container">
        <div className="select-container">
          {currentUser &&
          Array.isArray(currentUser.leagues) &&
          currentUser.leagues.length ? (
            <>
              <InputLabel id="League">League:</InputLabel>
              <Select
                labelId="League"
                name="League"
                label="League:"
                id="league-select"
                value={league || ''}
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
              {canShowQualifying ? (
                <Link href={currentRound.bigBikeQualifying} passHref>
                  <a href="" target="_blank">
                    <h3>Qualifying Results</h3>
                  </a>
                </Link>
              ) : (
                <h3>Qualifying not yet completed</h3>
              )}
            </>
          ) : (
            <div>Loading Leagues...</div>
          )}
        </div>
        <WeeklyPicks
          riders={entries}
          selectedRiders={selectedRidersWithErrors}
          setSelectedRiders={setSelectedRiders}
        />
      </div>
    </TeamStyled>
  );
};

export default Team;
