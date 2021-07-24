import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  h1,
  h2,
  h4 {
    text-align: center;
  }

  .pick {
    min-width: 200px;
    background-color: aqua;
    border: solid 1px black;

    > h1 {
      font-size: 14px;
    }

    .rider-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .no-picks {
    height: 5rem;
    display: flex;
    align-items: center;
  }

  @media (max-width: 500px) {
    flex-direction: column;

    .pick {
      width: 50%;
    }
  }
`;
