import styled from "styled-components";
/* Font Rules */
/* font-family: 'Alfa Slab One', cursive; font-family: 'Bangers',
cursive; font-family: 'Cinzel', serif; font-family: 'Kaushan Script',
cursive; font-family: 'Permanent Marker', cursive; font-family:
'Righteous', cursive; */

export default styled.div`
  margin: -8px;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ currentMode }) => (currentMode ? "#fff" : "#282828")};
  font-family: "Nunito sans";
`;
