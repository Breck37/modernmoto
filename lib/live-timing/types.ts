// Raw types derived from actual S3 response samples captured 2026-01-31 from event 1163 (Houston).

// ---------------------------------------------------------------------------
// Raw JSON response types (match actual S3 response shapes)
// ---------------------------------------------------------------------------

export interface RawSectorEntry {
  readonly DriverLID: number;
  readonly LapNumberStart: number;
  readonly LapNumberFinish: number;
  readonly SectorNumber: number;
  readonly SectorTimeSeconds: number;
  readonly IsFastestSectorNumber: boolean;
  readonly IsFastestSectorNumberOverall: boolean;
}

export interface RawRiderEntry {
  readonly DriverLID: number;
  readonly Position: number;
  readonly FirstName: string;
  readonly LastName: string;
  readonly BikeNumber: string;
  readonly PositionChangeSinceLastLap: number;
  readonly IsFastestHoleShotInRace: boolean;
  readonly CompletedLaps: number;
  readonly LapTime: number;
  readonly ElapsedTime: number;
  readonly Pace: string;
  readonly FastestLap: number;
  readonly EstimatedPosition: number;
  readonly IsComplete: boolean;
  readonly IsCheckedIn: boolean;
  readonly Country: string;
  readonly Sponsor: string;
  readonly AverageLap: number;
  readonly DifferenceBehindPrecedingDisplay: string;
  readonly FastestLapNumber: number;
  readonly IsBroken: boolean;
  readonly IsDidNotStart: boolean;
  readonly IsDidNotFinish: boolean;
  readonly IsDisqualified: boolean;
  readonly IsPitting: boolean;
  readonly Top3Consecutive: number;
  readonly CurrentSectorNumber: number;
  readonly CurrentSegmentNumber: number;
  readonly PrimaryColor: string;
  readonly SecondaryColor: string;
  readonly FastestSpeedTrapKPH: number;
  readonly FastestRaceLineKPH: number;
  readonly JokerLanePassedCount: number;
  readonly NickName: string;
  readonly Top5Average: number;
  readonly Top10Average: number;
  readonly Top15Average: number;
  readonly Manufacturer: string;
  readonly DifferenceBehindLeaderDisplay: string;
  readonly RaceLID: number;
  readonly ClassLID: number;
  readonly StaggeredStartDateTime: string;
  readonly EstimatedFinishDateTime: string;
  readonly AdjustmentSecondsDisplay: string;
  readonly TeamName: string;
  readonly Hometown: string;
  readonly Age: number;
  readonly ChaseTopGroup: number;
  readonly ChaseBottomGroup: number;
  readonly IsLastLapBestOverall: boolean;
  readonly IsLastLapBestPersonal: boolean;
  readonly IsFastestLapBestOverall: boolean;
  readonly LatestSectors: readonly RawSectorEntry[];
  readonly LatestSegments: readonly RawSectorEntry[];
}

export type RawRidersData = readonly RawRiderEntry[];

export interface RawClockData {
  readonly Elapsed: number;
  readonly Remaining: number;
  readonly FlagType: number;
  readonly CautionElapsedSeconds: number;
}

export interface RawWeatherData {
  readonly IconURL: string;
  readonly TemperatureDegreesFahrenheit: number;
  readonly TemperatureDegreesCelsius: number;
  readonly Forecast: string;
  readonly WindDirection: string;
  readonly WindSpeed: string;
  readonly HumidityPercentage: number | null;
}

export interface RawSectorName {
  readonly SectorNumber: number;
  readonly SectorName: string;
  readonly SectorColor: string;
}

export interface RawSegmentName {
  readonly SegmentNumber: number;
  readonly SegmentName: string;
  readonly SegmentColor: string;
}

export interface RawSeriesEntry {
  readonly Name: string;
}

export interface RawRaceData {
  readonly ClassName: string;
  readonly RaceStatus: number;
  readonly RaceLengthSeconds: number;
  readonly RaceNumber: number;
  readonly TotalRaces: number;
  readonly RoundNumber: number;
  readonly TopQualifier: string;
  readonly RoundType: string;
  readonly NumberOfSectors: number;
  readonly NumberOfSegments: number;
  readonly EventName: string;
  readonly SortingType: number;
  readonly IsRaceLineLengthUsed: boolean;
  readonly HeatNumber: number;
  readonly TotalHeats: number;
  readonly EventStartDateTime: string;
  readonly EventEndDateTime: string;
  readonly NumberOfRacersInRace: number;
  readonly IsJokerLaneUsed: boolean;
  readonly RaceLengthType: number;
  readonly RaceNotes: string;
  readonly LapsAfterTimeExpires: number;
  readonly StartType: number;
  readonly NumberOfBumpUps: number;
  readonly RaceLID: number;
  readonly ClassLID: number;
  readonly LapLimit: number;
  readonly RaceNameOverride: string;
  readonly RaceInformationOverride: string;
  readonly MainNumber: number;
  readonly MultiMainCount: number;
  readonly SectorNames: readonly RawSectorName[];
  readonly SegmentNames: readonly RawSegmentName[];
  readonly Series: readonly RawSeriesEntry[];
}

// ---------------------------------------------------------------------------
// Normalized domain model interfaces
// ---------------------------------------------------------------------------

export interface SectorTiming {
  readonly driverLID: number;
  readonly lapNumberStart: number;
  readonly lapNumberFinish: number;
  readonly sectorNumber: number;
  readonly sectorTimeSeconds: number;
  readonly isFastestSectorNumber: boolean;
  readonly isFastestSectorNumberOverall: boolean;
}

export interface RiderTiming {
  readonly driverLID: number;
  readonly bikeNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly position: number;
  readonly completedLaps: number;
  readonly lapTime: number;
  readonly elapsedTime: number;
  readonly pace: string;
  readonly fastestLap: number;
  readonly fastestLapNumber: number;
  readonly gap: string;
  readonly interval: string;
  readonly averageLap: number;
  readonly manufacturer: string;
  readonly positionChange: number;
  readonly isFastestHoleShot: boolean;
  readonly isComplete: boolean;
  readonly isLastLapBestPersonal: boolean;
  readonly isLastLapBestOverall: boolean;
  readonly isFastestLapBestOverall: boolean;
  readonly isBroken: boolean;
  readonly isDNS: boolean;
  readonly isDNF: boolean;
  readonly isDQ: boolean;
  readonly isPitting: boolean;
  readonly sectors: readonly SectorTiming[];
}

export interface ClockState {
  readonly elapsed: number;
  readonly remaining: number;
  readonly flagType: number;
  readonly cautionElapsed: number;
}

export interface WeatherState {
  readonly iconUrl: string;
  readonly temperatureF: number;
  readonly temperatureC: number;
  readonly forecast: string;
  readonly windDirection: string;
  readonly windSpeed: string;
  readonly humidity: number | null;
}

export interface RaceSectorName {
  readonly number: number;
  readonly name: string;
  readonly color: string;
}

export interface RaceInfo {
  readonly className: string;
  readonly raceStatus: number;
  readonly raceLengthSeconds: number;
  readonly raceNumber: number;
  readonly totalRaces: number;
  readonly roundNumber: number;
  readonly eventName: string;
  readonly heatNumber: number;
  readonly totalHeats: number;
  readonly numberOfRacers: number;
  readonly raceLID: number;
  readonly classLID: number;
  readonly sectorNames: readonly RaceSectorName[];
  readonly series: readonly string[];
}

export interface SessionState {
  readonly eventId: string;
  readonly timestamp: number;
  readonly clock: ClockState;
  readonly riders: readonly RiderTiming[];
  readonly weather: WeatherState;
  readonly race: RaceInfo;
}

export type RaceEventType =
  | 'POSITION_CHANGE'
  | 'LAP_COMPLETED'
  | 'LEADER_CHANGE'
  | 'SESSION_STATUS_CHANGED';

export interface RaceEvent {
  readonly type: RaceEventType;
  readonly timestamp: number;
  readonly payload: Record<string, unknown>;
}
