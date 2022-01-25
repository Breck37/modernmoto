import React from "react";
import styled from "styled-components";
import { ResultsPodium } from "../components";

export default {
  title: "components/ResultsPodium",
  component: ResultsPodium,
};

const mockResultsPodium = [
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
    number: "690",
    position: 10,
    bike: "KTM",
  },
];

export const DesktopResultsPodium = () => {
  return <ResultsPodium riders={mockResultsPodium} />;
};

const MobileContainer = styled.div`
  width: 350px;
`;

export const MobileResultsPodium = () => {
  return (
    <MobileContainer>
      <ResultsPodium riders={mockResultsPodium} small />
    </MobileContainer>
  );
};
