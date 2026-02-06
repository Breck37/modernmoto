import { describe, it, expect, vi } from 'vitest';
import { normalize } from './normalizer';
import type {
  RawTimingData,
  RawRiderEntry,
  RawClockData,
  RawWeatherData,
  RawRaceData,
} from './types';

// ---------------------------------------------------------------------------
// Fixtures based on event 1163 (Houston SX) response samples
// ---------------------------------------------------------------------------

const riderA: RawRiderEntry = {
  DriverLID: 101,
  Position: 2,
  FirstName: 'Jett',
  LastName: 'Lawrence',
  BikeNumber: '18',
  PositionChangeSinceLastLap: 1,
  IsFastestHoleShotInRace: false,
  CompletedLaps: 12,
  LapTime: 52.345,
  ElapsedTime: 628.14,
  Pace: '52.5',
  FastestLap: 51.234,
  EstimatedPosition: 2,
  IsComplete: false,
  IsCheckedIn: true,
  Country: 'AU',
  Sponsor: 'Honda HRC',
  AverageLap: 52.678,
  DifferenceBehindPrecedingDisplay: '+1.234',
  FastestLapNumber: 5,
  IsBroken: false,
  IsDidNotStart: false,
  IsDidNotFinish: false,
  IsDisqualified: false,
  IsPitting: false,
  Top3Consecutive: 156.234,
  CurrentSectorNumber: 2,
  CurrentSegmentNumber: 3,
  PrimaryColor: '#FF0000',
  SecondaryColor: '#FFFFFF',
  FastestSpeedTrapKPH: 89.5,
  FastestRaceLineKPH: 92.1,
  JokerLanePassedCount: 0,
  NickName: '',
  Top5Average: 52.1,
  Top10Average: 52.5,
  Top15Average: 52.8,
  Manufacturer: 'Honda',
  DifferenceBehindLeaderDisplay: '+1.234',
  RaceLID: 5001,
  ClassLID: 200,
  StaggeredStartDateTime: '',
  EstimatedFinishDateTime: '',
  AdjustmentSecondsDisplay: '',
  TeamName: 'Honda HRC',
  Hometown: 'Landsborough',
  Age: 21,
  ChaseTopGroup: 0,
  ChaseBottomGroup: 0,
  IsLastLapBestOverall: false,
  IsLastLapBestPersonal: true,
  IsFastestLapBestOverall: false,
  LatestSectors: [
    {
      DriverLID: 101,
      LapNumberStart: 12,
      LapNumberFinish: 12,
      SectorNumber: 1,
      SectorTimeSeconds: 17.123,
      IsFastestSectorNumber: true,
      IsFastestSectorNumberOverall: false,
    },
    {
      DriverLID: 101,
      LapNumberStart: 12,
      LapNumberFinish: 12,
      SectorNumber: 2,
      SectorTimeSeconds: 18.456,
      IsFastestSectorNumber: false,
      IsFastestSectorNumberOverall: false,
    },
  ],
  LatestSegments: [],
};

const riderB: RawRiderEntry = {
  DriverLID: 102,
  Position: 1,
  FirstName: 'Chase',
  LastName: 'Sexton',
  BikeNumber: '4',
  PositionChangeSinceLastLap: 0,
  IsFastestHoleShotInRace: true,
  CompletedLaps: 12,
  LapTime: 51.111,
  ElapsedTime: 626.906,
  Pace: '52.2',
  FastestLap: 50.987,
  EstimatedPosition: 1,
  IsComplete: false,
  IsCheckedIn: true,
  Country: 'US',
  Sponsor: 'Red Bull KTM',
  AverageLap: 52.242,
  DifferenceBehindPrecedingDisplay: '',
  FastestLapNumber: 3,
  IsBroken: false,
  IsDidNotStart: false,
  IsDidNotFinish: false,
  IsDisqualified: false,
  IsPitting: false,
  Top3Consecutive: 155.0,
  CurrentSectorNumber: 1,
  CurrentSegmentNumber: 2,
  PrimaryColor: '#FF6600',
  SecondaryColor: '#000000',
  FastestSpeedTrapKPH: 91.2,
  FastestRaceLineKPH: 93.5,
  JokerLanePassedCount: 0,
  NickName: '',
  Top5Average: 51.8,
  Top10Average: 52.1,
  Top15Average: 52.4,
  Manufacturer: 'KTM',
  DifferenceBehindLeaderDisplay: '',
  RaceLID: 5001,
  ClassLID: 200,
  StaggeredStartDateTime: '',
  EstimatedFinishDateTime: '',
  AdjustmentSecondsDisplay: '',
  TeamName: 'Red Bull KTM',
  Hometown: 'Clermont',
  Age: 25,
  ChaseTopGroup: 0,
  ChaseBottomGroup: 0,
  IsLastLapBestOverall: true,
  IsLastLapBestPersonal: true,
  IsFastestLapBestOverall: true,
  LatestSectors: [
    {
      DriverLID: 102,
      LapNumberStart: 12,
      LapNumberFinish: 12,
      SectorNumber: 1,
      SectorTimeSeconds: 16.999,
      IsFastestSectorNumber: true,
      IsFastestSectorNumberOverall: true,
    },
  ],
  LatestSegments: [],
};

const clockData: RawClockData = {
  Elapsed: 628,
  Remaining: 572,
  FlagType: 1,
  CautionElapsedSeconds: 0,
};

const weatherData: RawWeatherData = {
  IconURL: 'https://example.com/sunny.png',
  TemperatureDegreesFahrenheit: 78,
  TemperatureDegreesCelsius: 25.5,
  Forecast: 'Partly Cloudy',
  WindDirection: 'NNW',
  WindSpeed: '12 mph',
  HumidityPercentage: 45,
};

const raceData: RawRaceData = {
  ClassName: '450SX',
  RaceStatus: 2,
  RaceLengthSeconds: 1200,
  RaceNumber: 3,
  TotalRaces: 4,
  RoundNumber: 6,
  TopQualifier: 'Chase Sexton',
  RoundType: 'Main Event',
  NumberOfSectors: 3,
  NumberOfSegments: 5,
  EventName: 'Houston SX',
  SortingType: 1,
  IsRaceLineLengthUsed: false,
  HeatNumber: 0,
  TotalHeats: 2,
  EventStartDateTime: '2026-01-31T18:00:00',
  EventEndDateTime: '2026-01-31T23:00:00',
  NumberOfRacersInRace: 22,
  IsJokerLaneUsed: false,
  RaceLengthType: 1,
  RaceNotes: '',
  LapsAfterTimeExpires: 2,
  StartType: 0,
  NumberOfBumpUps: 0,
  RaceLID: 5001,
  ClassLID: 200,
  LapLimit: 0,
  RaceNameOverride: '',
  RaceInformationOverride: '',
  MainNumber: 1,
  MultiMainCount: 1,
  SectorNames: [
    { SectorNumber: 1, SectorName: 'Rhythm', SectorColor: '#00FF00' },
    { SectorNumber: 2, SectorName: 'Whoops', SectorColor: '#FF0000' },
    { SectorNumber: 3, SectorName: 'Finish', SectorColor: '#0000FF' },
  ],
  SegmentNames: [
    { SegmentNumber: 1, SegmentName: 'Seg1', SegmentColor: '#111' },
  ],
  Series: [{ Name: 'AMA Supercross' }, { Name: 'World Supercross' }],
};

function fullRawData(): RawTimingData {
  return {
    riders: [riderA, riderB],
    clock: clockData,
    weather: weatherData,
    race: raceData,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('normalize', () => {
  describe('complete data', () => {
    it('returns a valid SessionState with all fields populated', () => {
      const result = normalize(1163, fullRawData());

      expect(result.eventId).toBe('1163');
      expect(typeof result.timestamp).toBe('number');
      expect(result.riders).toHaveLength(2);
      expect(result.clock.elapsed).toBe(628);
      expect(result.weather.temperatureF).toBe(78);
      expect(result.race.className).toBe('450SX');
    });

    it('sorts riders by position ascending', () => {
      const result = normalize(1163, fullRawData());

      expect(result.riders[0].position).toBe(1);
      expect(result.riders[0].lastName).toBe('Sexton');
      expect(result.riders[1].position).toBe(2);
      expect(result.riders[1].lastName).toBe('Lawrence');
    });

    it('maps rider fields correctly', () => {
      const result = normalize(1163, fullRawData());
      const rider = result.riders[1]; // Lawrence (P2)

      expect(rider.driverLID).toBe(101);
      expect(rider.bikeNumber).toBe('18');
      expect(rider.firstName).toBe('Jett');
      expect(rider.lastName).toBe('Lawrence');
      expect(rider.completedLaps).toBe(12);
      expect(rider.lapTime).toBe(52.345);
      expect(rider.elapsedTime).toBe(628.14);
      expect(rider.pace).toBe('52.5');
      expect(rider.fastestLap).toBe(51.234);
      expect(rider.fastestLapNumber).toBe(5);
      expect(rider.gap).toBe('+1.234');
      expect(rider.interval).toBe('+1.234');
      expect(rider.averageLap).toBe(52.678);
      expect(rider.manufacturer).toBe('Honda');
      expect(rider.positionChange).toBe(1);
      expect(rider.isFastestHoleShot).toBe(false);
      expect(rider.isComplete).toBe(false);
      expect(rider.isLastLapBestPersonal).toBe(true);
      expect(rider.isLastLapBestOverall).toBe(false);
      expect(rider.isFastestLapBestOverall).toBe(false);
      expect(rider.isBroken).toBe(false);
      expect(rider.isDNS).toBe(false);
      expect(rider.isDNF).toBe(false);
      expect(rider.isDQ).toBe(false);
      expect(rider.isPitting).toBe(false);
    });

    it('maps sector data for each rider', () => {
      const result = normalize(1163, fullRawData());
      const rider = result.riders[1]; // Lawrence

      expect(rider.sectors).toHaveLength(2);
      expect(rider.sectors[0]).toEqual({
        driverLID: 101,
        lapNumberStart: 12,
        lapNumberFinish: 12,
        sectorNumber: 1,
        sectorTimeSeconds: 17.123,
        isFastestSectorNumber: true,
        isFastestSectorNumberOverall: false,
      });
      expect(rider.sectors[1].sectorNumber).toBe(2);
    });

    it('maps clock data correctly', () => {
      const result = normalize(1163, fullRawData());

      expect(result.clock).toEqual({
        elapsed: 628,
        remaining: 572,
        flagType: 1,
        cautionElapsed: 0,
      });
    });

    it('maps weather data correctly', () => {
      const result = normalize(1163, fullRawData());

      expect(result.weather).toEqual({
        iconUrl: 'https://example.com/sunny.png',
        temperatureF: 78,
        temperatureC: 25.5,
        forecast: 'Partly Cloudy',
        windDirection: 'NNW',
        windSpeed: '12 mph',
        humidity: 45,
      });
    });

    it('maps race info correctly', () => {
      const result = normalize(1163, fullRawData());

      expect(result.race.className).toBe('450SX');
      expect(result.race.raceStatus).toBe(2);
      expect(result.race.raceLengthSeconds).toBe(1200);
      expect(result.race.raceNumber).toBe(3);
      expect(result.race.totalRaces).toBe(4);
      expect(result.race.roundNumber).toBe(6);
      expect(result.race.eventName).toBe('Houston SX');
      expect(result.race.heatNumber).toBe(0);
      expect(result.race.totalHeats).toBe(2);
      expect(result.race.numberOfRacers).toBe(22);
      expect(result.race.raceLID).toBe(5001);
      expect(result.race.classLID).toBe(200);
    });

    it('maps sector names correctly', () => {
      const result = normalize(1163, fullRawData());

      expect(result.race.sectorNames).toEqual([
        { number: 1, name: 'Rhythm', color: '#00FF00' },
        { number: 2, name: 'Whoops', color: '#FF0000' },
        { number: 3, name: 'Finish', color: '#0000FF' },
      ]);
    });

    it('extracts series Name strings', () => {
      const result = normalize(1163, fullRawData());

      expect(result.race.series).toEqual([
        'AMA Supercross',
        'World Supercross',
      ]);
    });

    it('converts eventId to string', () => {
      const result = normalize(1163, fullRawData());
      expect(result.eventId).toBe('1163');
    });
  });

  describe('partial data (some endpoints null)', () => {
    it('handles null riders', () => {
      const result = normalize(1163, { ...fullRawData(), riders: null });

      expect(result.riders).toEqual([]);
      expect(result.clock.elapsed).toBe(628);
    });

    it('handles null clock', () => {
      const result = normalize(1163, { ...fullRawData(), clock: null });

      expect(result.clock).toEqual({
        elapsed: 0,
        remaining: 0,
        flagType: 0,
        cautionElapsed: 0,
      });
      expect(result.riders).toHaveLength(2);
    });

    it('handles null weather', () => {
      const result = normalize(1163, { ...fullRawData(), weather: null });

      expect(result.weather).toEqual({
        iconUrl: '',
        temperatureF: 0,
        temperatureC: 0,
        forecast: '',
        windDirection: '',
        windSpeed: '',
        humidity: null,
      });
    });

    it('handles null race', () => {
      const result = normalize(1163, { ...fullRawData(), race: null });

      expect(result.race).toEqual({
        className: '',
        raceStatus: 0,
        raceLengthSeconds: 0,
        raceNumber: 0,
        totalRaces: 0,
        roundNumber: 0,
        eventName: '',
        heatNumber: 0,
        totalHeats: 0,
        numberOfRacers: 0,
        raceLID: 0,
        classLID: 0,
        sectorNames: [],
        series: [],
      });
    });

    it('handles all endpoints null', () => {
      const result = normalize(1163, {
        riders: null,
        clock: null,
        weather: null,
        race: null,
      });

      expect(result.eventId).toBe('1163');
      expect(result.riders).toEqual([]);
      expect(result.clock.elapsed).toBe(0);
      expect(result.weather.forecast).toBe('');
      expect(result.race.className).toBe('');
    });
  });

  describe('empty and malformed inputs', () => {
    it('handles empty riders array', () => {
      const result = normalize(1163, { ...fullRawData(), riders: [] });
      expect(result.riders).toEqual([]);
    });

    it('handles rider with missing LatestSectors', () => {
      const malformedRider = {
        ...riderA,
        LatestSectors: undefined as unknown as readonly [],
      };
      const result = normalize(1163, {
        ...fullRawData(),
        riders: [malformedRider],
      });

      expect(result.riders[0].sectors).toEqual([]);
    });

    it('handles race with missing SectorNames', () => {
      const malformedRace = {
        ...raceData,
        SectorNames: undefined as unknown as readonly [],
      };
      const result = normalize(1163, {
        ...fullRawData(),
        race: malformedRace,
      });

      expect(result.race.sectorNames).toEqual([]);
    });

    it('handles race with missing Series', () => {
      const malformedRace = {
        ...raceData,
        Series: undefined as unknown as readonly [],
      };
      const result = normalize(1163, {
        ...fullRawData(),
        race: malformedRace,
      });

      expect(result.race.series).toEqual([]);
    });

    it('handles weather with null humidity', () => {
      const weatherWithNullHumidity: RawWeatherData = {
        ...weatherData,
        HumidityPercentage: null,
      };
      const result = normalize(1163, {
        ...fullRawData(),
        weather: weatherWithNullHumidity,
      });

      expect(result.weather.humidity).toBeNull();
    });

    it('never throws on any input', () => {
      expect(() =>
        normalize(1163, {
          riders: null,
          clock: null,
          weather: null,
          race: null,
        })
      ).not.toThrow();

      expect(() =>
        normalize(1163, {} as unknown as RawTimingData)
      ).not.toThrow();
    });

    it('produces a timestamp close to Date.now()', () => {
      const before = Date.now();
      const result = normalize(1163, fullRawData());
      const after = Date.now();

      expect(result.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.timestamp).toBeLessThanOrEqual(after);
    });
  });
});
