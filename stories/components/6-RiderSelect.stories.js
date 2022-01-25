import { action } from "@storybook/addon-actions";
import React from "react";
import { RiderSelect } from "../../components";
import { selectedRiders } from "../mocks";

export default {
  title: "components/RiderSelect",
  component: RiderSelect,
};

export const DesktopRiderSelect = () => {
  return (
    <div style={{ width: 500 }}>
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="1st place"
        onChange={() => null}
        riderPosition={1}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="2nd place"
        onChange={() => null}
        riderPosition={2}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="3rd place"
        onChange={() => null}
        riderPosition={3}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="4th place"
        onChange={() => null}
        riderPosition={4}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="10th place"
        onChange={() => null}
        riderPosition={10}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
      <RiderSelect
        title="Desktop"
        options={selectedRiders}
        selectLabel="Fastest"
        onChange={() => null}
        riderPosition={100}
        onClick={action("clicked Desktop")}
        {...selectedRiders}
      />
    </div>
  );
};
