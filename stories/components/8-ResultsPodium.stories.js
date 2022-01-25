import React from "react";
import styled from "styled-components";
import { ResultsPodium } from "../../components";

export default {
  title: "components/ResultsPodium",
  component: ResultsPodium,
};

export const DesktopResultsPodium = () => {
  return <ResultsPodium riders={ResultsPodium} />;
};

const MobileContainer = styled.div`
  width: 350px;
`;

export const MobileResultsPodium = () => {
  return (
    <MobileContainer>
      <ResultsPodium riders={ResultsPodium} small />
    </MobileContainer>
  );
};
