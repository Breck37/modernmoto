import styled from "styled-components";
import {
  MID_PURPLE,
  MODERN_AQUA,
  MODERN_DARK,
  MODERN_WHITE,
} from "../../styles/colors";

export default styled.div`
  max-width: 100vw;
  height: 128px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,255,255,1) 75%);


  .mode-container {
    height: 32px;
    min-height: 32px;
    padding-right: 5%;
    background-color: ${({ currentMode }) =>
      currentMode ? MODERN_WHITE : MODERN_DARK};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
      z-index: 3000;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${({ currentMode }) => (currentMode ? MODERN_DARK : MODERN_AQUA)};
      border: none;
      cursor: pointer;
      outline: inherit;
    }
  }

  .logo-container {
    width: 40%;
    filter: drop-shadow(10px 0px 5px rgba(0, 0, 0, 0.4));
    display: inherit;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: slide40 1.5s;
    animation-delay: 4s;
    transition: all 1.5s linear;

    .logo-wrap {
      margin-top: -32px;
      cursor: pointer;
      width: 100%;
      color: ${MODERN_AQUA};
      background-color: ${({ currentMode }) =>
        currentMode ? MODERN_WHITE : MODERN_DARK};
      height: 128px;
      display: inherit;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      font-family: Arial, serif;
      clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);

      > span {
        letter-spacing: 2px;
        text-shadow: 0 0 1px aqua, 0 1px 1px ${MID_PURPLE}, 0 2px 1px ${MID_PURPLE},
          1px 1px 1px ${MID_PURPLE}, 1px 2px 1px ${MID_PURPLE}, 1px 3px 1px ${MID_PURPLE},
          2px 1px 1px ${MID_PURPLE}, 2px 2px 1px ${MID_PURPLE}, 2px 3px 1px ${MID_PURPLE};
      }
    }

    .icon-wrap {
      background-color: ${({ currentMode }) => (currentMode ? "#fff" : "#FFF")};
    }
  }

  .tabs {
    position: absolute;
    top: 32px;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: flex-end;
    margin-left: 50%;
    width: 45%;

    > .tab:first-child {
      border-left: solid 2px #282828;
    }
    > .tab:last-child {
      border-right: solid 2px #282828;
    }

    .tab {
      flex: 1;
      padding: 8px 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-left: solid 1px #282828;
      border-right: solid 1px #282828;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, serif;
      height: 50%;
      color: ${MODERN_DARK};

      &:hover {
        font-size: 24px;
      }
    }
  }

  .menu {
    display: none;
  }

  @keyframes slide40 {
    0% {
      width: 0;
    }
    100% {
      width: 40%;
    }
  }
  @keyframes slide50 {
    0% {
      width: 0;
    }
    100% {
      width: 50%;
    }
  }
  @keyframes slide100 {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @media (max-width: 1300px) {
    .logo-container {
      width: 50%;
      animation: slide50 1.5s;
    }
  }

  @media (max-width: 1100px) {
    .tab {
      &:hover {
        font-size: 18px !important;
      }
    }
  }

  @media (max-width: 950px) {
    .logo-container {
      width: 100%;
      animation: slide100 1.5s;
      display: flex;
      align-items: center;
    }
    .tabs {
      display: ${({ showMobileTabs }) => (showMobileTabs ? "block" : "none")};
      flex-direction: column;
      width: 100%;
      z-index: 10000;
      margin-left: 0;
      top: 160px;
      background-color: ${({ currentMode }) =>
        currentMode ? MODERN_WHITE : MODERN_AQUA};      
      height: ${({ tabLength }) => tabLength * 56}px;      
      filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.3));
      animation: unveil 2.4s;
      transition: all 2.4s linear;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 8px;
      overflow: hidden;

      > .tab {
        height: 48px;
        opacity: 1;
        color: ${({ currentMode }) => (currentMode ? MID_PURPLE : MODERN_DARK)};
        border: none !important;
        padding: 4px 0;
        animation: showTabs 2.4s;
        transition: height: 2.4s linear;
        font-weight: 500;
      }
    }
    .logo-wrap {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
      justify-content: space-between;
      position: relative;
      margin-top: 0 !important;
    }
    .mode-container {
      padding-right: 18px;
    }
    .menu {
      display: inline-block;
      position: absolute;
      right: 24px;
      top: 50px;
      color: ${({ currentMode }) => (currentMode ? MODERN_AQUA : MODERN_DARK)};
    }
  }

  @media (max-width: 500px) {
    .logo-wrap {
      font-size: 36px !important;
      height: 96px !important;
    }
    .tabs {
      left: 0;
      width: 100%;
      top: 128px;
    }

    .menu {
      top: 33px;
    }
  }

  @keyframes unveil {
    0% {
      display: none;
      height: 0;
    }
    100 {
      display: block;
      height: ${({ tabLength }) => tabLength * 56}px;
    }
  }
  @keyframes showTabs {
    0% {
      opacity: 0;
      height: 0;
    }
    100 {
      opacity: 1;
      height: 48px;
    }
  }
`;
