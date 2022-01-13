import styled from "styled-components";
import { MODERN_WHITE } from "./colors";

export default styled.div`
  margin: 0;
  width: 100vw;
  overflow: hidden;
  height: calc(100vh - 128px);
  margin-top: 128px;
  overflow-y: scroll;
  color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

  main {
    margin-top: 128px;
    width: 75%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .marquee {
    position: relative;
    padding: 0 32px;
    display: flex;
    align-items: center;
    height: 100px;
    margin-top: 50px;
  }

  .animation-container {
    height: 100%;
    width: 450%;
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    animation: scroll 75s linear infinite;
    color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

    > span {
      width: 300px;
      font-size: 36px;
      font-family: Arial, serif;
    }
  }

  @keyframes scroll {
    0% {
      left: 100%;
    }
    100% {
      left: -450%;
    }
  }

  .fast-lap {
    position: relative;
    height: 65px;
    width: 350px;
    max-width: 350px;
    padding-right: 8px;
    margin-right: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ currentMode }) =>
      currentMode ? "#fff" : `${MODERN_WHITE}`};
    color: #282828;
    // color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};
    border: ${({ currentMode }) => (currentMode ? "#282828" : "aqua")} solid 1px;
  }

  .placement {
    position: absolute;
    font-size: 65px;
    left: 40%;
    color: rgba(0, 0, 0, 0.1);
  }

  .rider-last {
    display: none;
  }

  .rider-last,
  .rider-full {
    font-weight: bold;
  }

  .rider-image {
    background-color: #000;
    height: 100%;
    width: 65px;
  }

  .mobile-fastest {
    display: none;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer img {
    margin-left: 0.5rem;
  }

  footer a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .title a {
    color: #0070f3;
    text-decoration: none;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    text-decoration: underline;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
  }

  .title,
  .description {
    text-align: center;
  }

  .description {
    line-height: 1.5;
    font-size: 1.5rem;
  }

  code {
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }

  .grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    max-width: 800px;
    margin-top: 3rem;
  }

  .card {
    margin: 1rem;
    flex-basis: 45%;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .card:hover,
  .card:focus,
  .card:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  .card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .card p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .logo {
    height: 1em;
  }

  .mobile-fast-laps {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

    .fast-lap {
      flex-direction: row;
      justify-content: space-between;
      margin-right: 0;
      background-color: ${({ currentMode }) =>
        currentMode ? `${MODERN_WHITE}` : "#282828"};
      border: ${({ currentMode }) => (currentMode ? "#282828" : "aqua")} solid
        1px;
      color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};
      padding: 8px;

      .rider-image {
        height: 85%;
        width: 60px;
      }
    }
  }

  @media (max-width: 1490px) {
    .rider-full {
      display: none;
    }
    .rider-last {
      display: block;
    }

    .animation-container {
      min-width: 4000px;
      > span {
        width: 460px !important;
        margin-right: 32px;
      }
    }
  }

  @media (max-width: 1200px) {
    .fast-lap {
      flex-direction: column;
      height: 150px;
      width: 350px !important;

      > section {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .placement {
      position: static;
      font-size: 55px;
    }
  }

  @media (max-width: 800px) {
    overflow: scroll;
    height: auto;
    padding-bottom: 24px;

    .marquee {
      display: none;
    }

    .mobile-fastest {
      margin-top: 50px;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .fast-lap {
        max-width: 200px;
        margin-right: 0;
      }
    }
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }

  @keyframes scrollPhone {
    0% {
      left: 100%;
    }
    100% {
      left: -2000%;
    }
  }
`;
