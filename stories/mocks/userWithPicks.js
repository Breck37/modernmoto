import { mockPicks } from "./picks";

export const mockUserWithPicks = {
  archived: false,
  currentMode: 1,
  email: "brent.eckert7@gmail.com",
  leagues: ["League of Extraordinary Bros"],
  picks: [
    {
      bigBikePicks: [
        { name: "Ken Roczen", position: 2, points: 10 },
        { name: "Cooper Webb", position: 3, points: 5 },
        { name: "Chase Sexton", position: 4, points: 0 },
        { name: "Malcolm Stewart", position: 5, points: 0 },
        { name: "Broc Tickle", position: 10, points: 0 },
        { name: "Eli Tomac", position: 100, points: 20 },
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
        { name: "Ken Roczen", position: 2, points: 10 },
        { name: "Cooper Webb", position: 3, points: 5 },
        { name: "Chase Sexton", position: 4, points: 0 },
        { name: "Malcolm Stewart", position: 5, points: 0 },
        { name: "Broc Tickle", position: 10, points: 0 },
        { name: "Eli Tomac", position: 100, points: 20 },
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
