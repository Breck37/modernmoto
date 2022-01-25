import React from "react";
import styled from "styled-components";
import { FrontPlate, FrontPlateSmall } from "../components";

export default {
  title: "components/FrontPlate",
  component: FrontPlate,
};

const mockFrontPlateRiders = [
  {
    name: "Bruce Pizza",
    number: 22,
    position: 1,
    bike: "Yamaha",
  },
  {
    name: "Brent Eckert",
    number: 37,
    position: 4,
    bike: "Husqvarna",
  },
  {
    name: "Ken Roczen",
    number: 94,
    position: 5,
    bike: "Honda",
  },
  {
    name: "Eli Tomac",
    number: 1,
    position: 3,
    bike: "Kawasaki",
  },
  {
    name: "Justin Barcia",
    number: 51,
    position: 2,
    bike: "GasGas",
  },
  {
    name: "Bruce Pizza",
    number: 22,
    position: 100,
    bike: "Suzuki",
  },
  {
    name: "Pablo Taco",
    number: "69",
    position: 10,
    bike: "KTM",
  },
];

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
