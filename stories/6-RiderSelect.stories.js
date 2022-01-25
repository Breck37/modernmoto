import React from "react";
import { action } from "@storybook/addon-actions";
import { RiderSelect } from "../components";

export default {
  title: "components/RiderSelect",
  component: RiderSelect,
};

const mockProps = [
  {
    name: "Ken Roczen",
  },
  {
    name: "Eli Tomac",
  },
  {
    name: "Cooper Webb",
  },
  {
    name: "Adam Ciancurulo",
  },
  {
    name: "Malcolm Stewart",
  },
];

export const DesktopRiderSelect = () => {
  return (
    <div style={{ width: 500 }}>
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="1st place"
        onChange={() => null}
        riderPosition={1}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="2nd place"
        onChange={() => null}
        riderPosition={2}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="3rd place"
        onChange={() => null}
        riderPosition={3}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="4th place"
        onChange={() => null}
        riderPosition={4}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="10th place"
        onChange={() => null}
        riderPosition={10}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
      <RiderSelect
        title="Desktop"
        options={mockProps}
        selectLabel="Fastest"
        onChange={() => null}
        riderPosition={100}
        onClick={action("clicked Desktop")}
        {...mockProps}
      />
    </div>
  );
};
