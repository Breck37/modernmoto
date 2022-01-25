import React from "react";
import { action } from "@storybook/addon-actions";
import { Podium } from "../components";

export default {
  title: "components/Podium",
  component: Podium,
};

const mockProps = {
  firstPlace: {
    name: "Brad",
  },
  secondPlace: {
    name: "Frank",
  },
  thirdPlace: {
    name: "Ralph",
  },
};

export const DesktopPodium = () => (
  <Podium title="Desktop" onClick={action("clicked Desktop")} {...mockProps} />
);
