import styled from 'styled-components';
import { MODERN_PURPLE } from '../../styles/colors';

export const ModalStyled = styled.div`
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    z-index: 10000;

  ${(size) => {
    switch (size) {
      case 'normal':
      default:
        return {
          height: 300,
          width: 600,
        };
    }
  }}
`;

export const ModalContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${MODERN_PURPLE};
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(59,63,78,0.6);
  }
`