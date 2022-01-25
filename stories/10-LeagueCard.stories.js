import React from "react";
import { LeagueCard } from "../components";

export default {
  title: "components/LeagueCard",
  component: LeagueCard,
};

const mockPicks = [
  {
    _id: "60760cfe2afe8e0008bf17b0",
    user: "Levi",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Eli Tomac",
        position: 1,
        points: 5,
      },
      {
        riderName: "Cooper Webb",
        position: 2,
        points: 0,
      },
      {
        riderName: "Chase Sexton",
        position: 3,
        points: 5,
      },
      {
        riderName: "Ken Roczen",
        position: 4,
        points: 5,
      },
      {
        riderName: "Jason Anderson",
        position: 5,
        points: 5,
      },
      {
        riderName: "Joey Savatgy",
        position: 10,
        points: 20,
      },
      {
        riderName: "Eli Tomac",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 40,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "1st (Tied)",
    created_at: "2021-04-13T21:28:30.131Z",
    email: "lbhammett22@gmail.com",
  },
  {
    _id: "60760df02afe8e0008bf17b1",
    user: "Travis",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Eli Tomac",
        position: 1,
        points: 5,
      },
      {
        riderName: "Cooper Webb",
        position: 2,
        points: 0,
      },
      {
        riderName: "Ken Roczen",
        position: 3,
        points: 5,
      },
      {
        riderName: "Chase Sexton",
        position: 4,
        points: 5,
      },
      {
        riderName: "Jason Anderson",
        position: 5,
        points: 5,
      },
      {
        riderName: "Joey Savatgy",
        position: 10,
        points: 20,
      },
      {
        riderName: "Eli Tomac",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 40,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "1st (Tied)",
    created_at: "2021-04-13T21:32:32.066Z",
    email: "tdmonk1@asu.edu",
  },
  {
    _id: "607614e06ab3f50008d230d6",
    user: "RJ",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Eli Tomac",
        position: 1,
        points: 5,
      },
      {
        riderName: "Cooper Webb",
        position: 2,
        points: 0,
      },
      {
        riderName: "Aaron Plessinger",
        position: 3,
        points: 0,
      },
      {
        riderName: "Chase Sexton",
        position: 4,
        points: 5,
      },
      {
        riderName: "Justin Barcia",
        position: 5,
        points: 5,
      },
      {
        riderName: "Joey Savatgy",
        position: 10,
        points: 20,
      },
      {
        riderName: "Eli Tomac",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 35,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "3rd",
    created_at: "2021-04-13T22:02:08.010Z",
    email: "jonesinaz@aol.com",
  },
  {
    _id: "60760cd953f59d00082f502e",
    user: "Kyler",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Ken Roczen",
        position: 1,
        points: 10,
      },
      {
        riderName: "Cooper Webb",
        position: 2,
        points: 0,
      },
      {
        riderName: "Eli Tomac",
        position: 3,
        points: 5,
      },
      {
        riderName: "Jason Anderson",
        position: 4,
        points: 5,
      },
      {
        riderName: "Chase Sexton",
        position: 5,
        points: 5,
      },
      {
        riderName: "Dylan Ferrandis",
        position: 10,
        points: 0,
      },
      {
        riderName: "Cooper Webb",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 25,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "4th",
    created_at: "2021-04-13T21:27:53.821Z",
    email: "kyler.hopper@gmail.com",
  },
  {
    _id: "6075f706cd8ce30008545431",
    user: "Kohl",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Cooper Webb",
        position: 1,
        points: 0,
      },
      {
        riderName: "Eli Tomac",
        position: 2,
        points: 5,
      },
      {
        riderName: "Jason Anderson",
        position: 3,
        points: 10,
      },
      {
        riderName: "Ken Roczen",
        position: 4,
        points: 5,
      },
      {
        riderName: "Aaron Plessinger",
        position: 5,
        points: 0,
      },
      {
        riderName: "Martin Davalos",
        position: 10,
        points: 0,
      },
      {
        riderName: "Eli Tomac",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 20,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "5th (Tied)",
    created_at: "2021-04-13T19:54:46.740Z",
    email: "kohl92@gmail.com",
  },
  {
    _id: "607610f10ed3a90009cd41b8",
    user: "Brent",
    week: 14,
    year: 2021,
    bigBikePicks: [
      {
        riderName: "Eli Tomac",
        position: 1,
        points: 5,
      },
      {
        riderName: "Cooper Webb",
        position: 2,
        points: 0,
      },
      {
        riderName: "Chase Sexton",
        position: 3,
        points: 5,
      },
      {
        riderName: "Jason Anderson",
        position: 4,
        points: 5,
      },
      {
        riderName: "Ken Roczen",
        position: 5,
        points: 5,
      },
      {
        riderName: "Malcolm Stewart",
        position: 10,
        points: 0,
      },
      {
        riderName: "Eli Tomac",
        position: 100,
        points: 0,
      },
    ],
    smallBikePicks: [],
    totalPoints: 20,
    hasBeenEquated: false,
    league: "League of Extraordinary Bros",
    rank: "5th (Tied)",
    created_at: "2021-04-13T21:45:21.344Z",
    email: "brent.eckert7@gmail.com",
  },
];

const mockUserWithPicks = {
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

export const LeagueCardMobile = () => {
  return <LeagueCard leaguePicks={mockUserWithPicks.leaguePicks} />;
};
