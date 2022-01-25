import React from "react";
import { action } from "@storybook/addon-actions";
// import { Button } from '@storybook/react/demo';
import Button from "@material-ui/core/Button";

export default {
  title: "components/Button",
  component: Button,
};

export const Text = () => (
  <Button variant="contained" color="secondary" onClick={action("clicked")}>
    Hello Button
  </Button>
);

export const Emoji = () => (
  <Button variant="contained" color="primary" onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
