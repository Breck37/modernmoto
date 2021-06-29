import React, { useMemo } from 'react';
import PicksStyled from './PicksStyled';
import RiderSelect from '../RiderSelect/RiderSelect';
import currentRound from '../../constants/currentRound';

const WeeklyPicks = ({ riders, selectedRiders, setSelectedRiders, classType }) => {
  if (!riders) return null;
  if (Array.isArray(riders) && !riders.length) return null;

  const riderPositions = useMemo(() => {
    if (!selectedRiders[classType]) {
      return {
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null,
        tenth: null,
        fast: null,
      }
    }
    return {
      first: selectedRiders[classType].find((rider) => rider.position === 1),
      second: selectedRiders[classType].find((rider) => rider.position === 2),
      third: selectedRiders[classType].find((rider) => rider.position === 3),
      fourth: selectedRiders[classType].find((rider) => rider.position === 4),
      fifth: selectedRiders[classType].find((rider) => rider.position === 5),
      tenth: selectedRiders[classType].find((rider) => rider.position === 10),
      fast: selectedRiders[classType].find((rider) => rider.position === 100),
      fast1: selectedRiders[classType].find((rider) => rider.position === 101),
      fast2: selectedRiders[classType].find((rider) => rider.position === 102),
    };
  }, [selectedRiders]);

  const cleanseSelectedRiders = (riderName, position) => {
    const selectedCopy = { ...selectedRiders };

    if (!riderName) {
      return {
        selected: {
          ...selectedCopy,
          [classType]: selectedCopy[classType]
            .filter((rider) => rider.position !== position)
            .sort((a, b) => a.position - b.position),
        },
        sanitizedRider: null,
      };
    }
    console.log('SELECTING', !selectedRiders[classType], selectedRiders[classType])
    const sanitizedRider = { riderName, position, points: 0 };
    if (!selectedRiders[classType]) {
      return {
        selected: selectedCopy,
        sanitizedRider
      }
    }
    // const alreadySelectedRiderIndex = selectedRiders.find(
    //   (rider) => rider.riderName === riderName
    // );

    return {
      selected: {
        ...selectedCopy,
        [classType]: selectedCopy[classType]
          .filter((rider) => rider.position !== position)
          .sort((a, b) => a.position - b.position),
      },
      sanitizedRider,
    };
  };

  const handleRiderSelection = (rider, position) => {
    const { selected, sanitizedRider } = cleanseSelectedRiders(rider, position);
    console.log({ selected, classType, sanitizedRider })
    if (!sanitizedRider) {
      console.warn('HIT 1')
      // setSelectedRiders(selected);
      return;
    }
    if (!selected || !selected[classType] || !selected[classType].length) {
      console.warn('HIT 2')
      setSelectedRiders({
        ...selected,
        [classType]: [sanitizedRider]
      });
      return;
    }
    console.warn('HIT 3')
    setSelectedRiders({
      ...selected,
      [classType]: [...selected[classType], sanitizedRider]
    });
  };

  // if (picksUnavailable) {
  //   return (
  //     <PicksStyled>
  //       <div className="unavailable">Window to make picks has closed</div>
  //     </PicksStyled>
  //   );
  // }
  console.log({ riders, riderPositions })
  return (
    <PicksStyled>
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="1st place"
        riderPosition={1}
        value={riderPositions.first}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="2nd place"
        riderPosition={2}
        value={riderPositions.second}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="3rd place"
        riderPosition={3}
        value={riderPositions.third}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="4th place"
        riderPosition={4}
        value={riderPositions.fourth}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="5th place"
        riderPosition={5}
        value={riderPositions.fifth}
      />
      <RiderSelect
        onChange={handleRiderSelection}
        options={riders}
        selectLabel="10th place"
        riderPosition={10}
        value={riderPositions.tenth}
      />
      {currentRound.type === 'sx' ?
        <RiderSelect
          onChange={handleRiderSelection}
          options={riders}
          selectLabel="Fastest lap"
          riderPosition={100}
          value={riderPositions.fast}
        />
        : (
          <>
            <RiderSelect
              onChange={handleRiderSelection}
              options={riders}
              selectLabel="Fastest Lap Moto 1"
              riderPosition={101}
              value={riderPositions.fast1}
            />
            <RiderSelect
              onChange={handleRiderSelection}
              options={riders}
              selectLabel="Fastest Lap Moto 2"
              riderPosition={102}
              value={riderPositions.fast2}
            />
          </>

        )}
    </PicksStyled>
  );
};

export default WeeklyPicks;
