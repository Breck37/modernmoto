import React from "react";
import { LeagueCard } from "../../components";
import { mockUserWithPicks } from "../mocks";

export default {
  title: "components/LeagueCard",
  component: LeagueCard,
};

export const LeagueCardMobile = () => {
  return <LeagueCard leaguePicks={mockUserWithPicks.leaguePicks} />;
};
