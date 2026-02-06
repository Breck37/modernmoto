import type {
  RawTimingData,
  RawRiderEntry,
  RawSectorEntry,
  RawClockData,
  RawWeatherData,
  RawRaceData,
  SessionState,
  RiderTiming,
  SectorTiming,
  ClockState,
  WeatherState,
  RaceInfo,
} from './types';

const DEFAULT_CLOCK: ClockState = {
  elapsed: 0,
  remaining: 0,
  flagType: 0,
  cautionElapsed: 0,
};

const DEFAULT_WEATHER: WeatherState = {
  iconUrl: '',
  temperatureF: 0,
  temperatureC: 0,
  forecast: '',
  windDirection: '',
  windSpeed: '',
  humidity: null,
};

const DEFAULT_RACE: RaceInfo = {
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
};

function normalizeSector(raw: RawSectorEntry): SectorTiming {
  return {
    driverLID: raw.DriverLID ?? 0,
    lapNumberStart: raw.LapNumberStart ?? 0,
    lapNumberFinish: raw.LapNumberFinish ?? 0,
    sectorNumber: raw.SectorNumber ?? 0,
    sectorTimeSeconds: raw.SectorTimeSeconds ?? 0,
    isFastestSectorNumber: raw.IsFastestSectorNumber ?? false,
    isFastestSectorNumberOverall: raw.IsFastestSectorNumberOverall ?? false,
  };
}

function normalizeRider(raw: RawRiderEntry): RiderTiming {
  return {
    driverLID: raw.DriverLID ?? 0,
    bikeNumber: raw.BikeNumber ?? '',
    firstName: raw.FirstName ?? '',
    lastName: raw.LastName ?? '',
    position: raw.Position ?? 0,
    completedLaps: raw.CompletedLaps ?? 0,
    lapTime: raw.LapTime ?? 0,
    elapsedTime: raw.ElapsedTime ?? 0,
    pace: raw.Pace ?? '',
    fastestLap: raw.FastestLap ?? 0,
    fastestLapNumber: raw.FastestLapNumber ?? 0,
    gap: raw.DifferenceBehindLeaderDisplay ?? '',
    interval: raw.DifferenceBehindPrecedingDisplay ?? '',
    averageLap: raw.AverageLap ?? 0,
    manufacturer: raw.Manufacturer ?? '',
    positionChange: raw.PositionChangeSinceLastLap ?? 0,
    isFastestHoleShot: raw.IsFastestHoleShotInRace ?? false,
    isComplete: raw.IsComplete ?? false,
    isLastLapBestPersonal: raw.IsLastLapBestPersonal ?? false,
    isLastLapBestOverall: raw.IsLastLapBestOverall ?? false,
    isFastestLapBestOverall: raw.IsFastestLapBestOverall ?? false,
    isBroken: raw.IsBroken ?? false,
    isDNS: raw.IsDidNotStart ?? false,
    isDNF: raw.IsDidNotFinish ?? false,
    isDQ: raw.IsDisqualified ?? false,
    isPitting: raw.IsPitting ?? false,
    sectors: Array.isArray(raw.LatestSectors)
      ? raw.LatestSectors.map(normalizeSector)
      : [],
  };
}

function normalizeClock(raw: RawClockData | null): ClockState {
  if (!raw) return DEFAULT_CLOCK;
  return {
    elapsed: raw.Elapsed ?? 0,
    remaining: raw.Remaining ?? 0,
    flagType: raw.FlagType ?? 0,
    cautionElapsed: raw.CautionElapsedSeconds ?? 0,
  };
}

function normalizeWeather(raw: RawWeatherData | null): WeatherState {
  if (!raw) return DEFAULT_WEATHER;
  return {
    iconUrl: raw.IconURL ?? '',
    temperatureF: raw.TemperatureDegreesFahrenheit ?? 0,
    temperatureC: raw.TemperatureDegreesCelsius ?? 0,
    forecast: raw.Forecast ?? '',
    windDirection: raw.WindDirection ?? '',
    windSpeed: raw.WindSpeed ?? '',
    humidity: raw.HumidityPercentage ?? null,
  };
}

function normalizeRace(raw: RawRaceData | null): RaceInfo {
  if (!raw) return DEFAULT_RACE;
  return {
    className: raw.ClassName ?? '',
    raceStatus: raw.RaceStatus ?? 0,
    raceLengthSeconds: raw.RaceLengthSeconds ?? 0,
    raceNumber: raw.RaceNumber ?? 0,
    totalRaces: raw.TotalRaces ?? 0,
    roundNumber: raw.RoundNumber ?? 0,
    eventName: raw.EventName ?? '',
    heatNumber: raw.HeatNumber ?? 0,
    totalHeats: raw.TotalHeats ?? 0,
    numberOfRacers: raw.NumberOfRacersInRace ?? 0,
    raceLID: raw.RaceLID ?? 0,
    classLID: raw.ClassLID ?? 0,
    sectorNames: Array.isArray(raw.SectorNames)
      ? raw.SectorNames.map((s) => ({
          number: s.SectorNumber ?? 0,
          name: s.SectorName ?? '',
          color: s.SectorColor ?? '',
        }))
      : [],
    series: Array.isArray(raw.Series)
      ? raw.Series.map((s) => s.Name ?? '')
      : [],
  };
}

export function normalize(eventId: number, raw: RawTimingData): SessionState {
  const riders = Array.isArray(raw.riders)
    ? raw.riders
        .map(normalizeRider)
        .slice()
        .sort((a, b) => a.position - b.position)
    : [];

  return {
    eventId: String(eventId),
    timestamp: Date.now(),
    clock: normalizeClock(raw.clock),
    riders,
    weather: normalizeWeather(raw.weather),
    race: normalizeRace(raw.race),
  };
}
