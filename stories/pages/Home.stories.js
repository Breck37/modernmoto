import React from "react";
import { Presentation } from "../../pages/home/Home";
import { mockUserWithPicks } from "../mocks";

export default {
  title: "pages/Home",
  component: Presentation,
};

export const Primary = (args) => <Presentation {...args} />;
Primary.args = {
  currentMode: 0,
  userWithPicks: mockUserWithPicks,
};
