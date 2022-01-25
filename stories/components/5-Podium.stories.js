import { action } from "@storybook/addon-actions";
import React from "react";
import { Podium } from "../../components";
import { mockPodium } from "../mocks";

export default {
  title: "components/Podium",
  component: Podium,
};

export const DesktopPodium = () => (
  <Podium title="Desktop" onClick={action("clicked Desktop")} {...mockPodium} />
);
