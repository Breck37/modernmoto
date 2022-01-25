import React from "react";
import styled from "styled-components";
import { FrontPlate, FrontPlateSmall } from "../../components";
import { mockFrontPlateRiders } from "../mocks/frontPlate";

export default {
  title: "components/FrontPlate",
  component: FrontPlate,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const DesktopFrontPlate = () => {
  return (
    <Container>
      {mockFrontPlateRiders.map((rider) => (
        <FrontPlate key={rider.name} rider={rider} />
      ))}
    </Container>
  );
};

const MobileContainer = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const MobileFrontPlate = () => {
  return (
    <MobileContainer>
      {mockFrontPlateRiders.map((rider) => (
        <FrontPlateSmall key={rider.name} rider={rider} small />
      ))}
    </MobileContainer>
  );
};
