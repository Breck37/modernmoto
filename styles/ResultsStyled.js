import styled from "styled-components";

export default styled.div`
  width: 85%;
  height: 100%;
  margin: 175px 0 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .round-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

    h1,
    h2,
    h3 {
      margin: 0;
      letter-spacing: 1px;
    }
  }

  .fastest-key {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

    .color-sample {
      margin-right: 16px;
      width: 35px;
      height: 25px;
      background-color: ${({ fastLapLeaderLegend }) =>
        `rgb(${fastLapLeaderLegend})`};
    }

    .fast-lap-info {
      margin-left: 0.5rem;
    }
  }
`;
