import { mockPicks } from "./picks";

export const mockUserWithPicks = {
  archived: false,
  currentMode: 1,
  email: "brent.eckert7@gmail.com",
  leagues: ["League of Extraordinary Bros"],
  picks: [
    {
      bigBikePicks: [
        { riderName: "Ken Roczen", position: 2, points: 10 },
        { riderName: "Cooper Webb", position: 3, points: 5 },
        { riderName: "Chase Sexton", position: 4, points: 0 },
        { riderName: "Malcolm Stewart", position: 5, points: 0 },
        { riderName: "Broc Tickle", position: 10, points: 0 },
        { riderName: "Eli Tomac", position: 100, points: 20 },
      ],
      hasBeenEquated: true,
      league: "League of Extraordinary Bros",
      rank: 2,
      totalPoints: 40,
      user: "brent.eckert7@gmail.com",
      week: 13,
      year: 2021,
    },
    {
      bigBikePicks: [
        { riderName: "Ken Roczen", position: 2, points: 10 },
        { riderName: "Cooper Webb", position: 3, points: 5 },
        { riderName: "Chase Sexton", position: 4, points: 0 },
        { riderName: "Malcolm Stewart", position: 5, points: 0 },
        { riderName: "Broc Tickle", position: 10, points: 0 },
        { riderName: "Eli Tomac", position: 100, points: 20 },
      ],
      hasBeenEquated: true,
      league: "League of Extraordinary Bros",
      rank: 2,
      totalPoints: 40,
      user: "brent.eckert7@gmail.com",
      week: 12,
      year: 2021,
    },
  ],
  leaguePicks: mockPicks,
  username: "Brent",
  weeklyResults: [],
};
