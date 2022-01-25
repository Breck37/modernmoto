import React from "react";
import { action } from "@storybook/addon-actions";
import { Tab } from "../../components";

export default {
  title: "components/Tab",
  component: Tab,
};

export const DesktopTab = () => (
  <Tab title="Desktop" onClick={action("clicked Desktop")} />
);

export const ResponsiveTab = () => (
  <Tab title="Responsive" onClick={action("clicked Responsive")} />
);
