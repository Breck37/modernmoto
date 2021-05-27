import styled from 'styled-components';

export default styled.div`
  margin: 150px 0 0;
  width: 100vw;
  min-height: 100%;
  overflow: hidden;
  background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#282828')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ currentMode }) => (currentMode ? '#282828' : '#fff')};

  .team-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
  }

  .select-container {
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > a {
      text-decoration: none;
    }
    > h3 {
      text-align: center;
    }
  }

  .unavailable {
    background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#282828')};
    text-align: center;
    color: ${({ currentMode }) => (currentMode ? '#282828' : '#fff')};
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    width: 100%;
  }

  .MuiInput-root {
    min-width: 100%;
  }

  .team-submit-success {
    position: absolute;
    right: 16px;
    bottom: 0px;
    height: 24px;
    font-size: 18px;
    color: limegreen;
    z-index: 10000;
  }

  @media (max-width: 500px) {
    .MuiButton-root {
      width: 100%;
    }

    .team-container {
      width: 100%;
    }

    .select-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 75%;

      .MuiInputLabel-root,
      .MuiSelect-root {
        color: ${({ currentMode }) => (currentMode ? '#282828' : '#fff')};
      }

      .MuiInputLabel-root {
        align-self: flex-start;
      }
    }

    .team-submit-success {
      position: absolute;
      right: 16px;
      bottom: 16px;
      height: 24px;
      font-size: 18px;
      color: limegreen;
      z-index: 10000;
    }
  }
`;
