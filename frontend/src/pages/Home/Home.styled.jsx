import styled from "styled-components";

const SCHome = styled.main`
  background: #ccdccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 50px;
  flex-grow: 1;

  .counters {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pages {
    display: flex;
    gap: 10px;

    p,
    a {
      color: black;
      text-decoration: none;
      padding: 10px 15px;
      border-radius: 5px;
    }

    a {
      background: #9ea4c0;
    }

    p {
      background: #c3c8dd;
    }
  }
`;

export default SCHome;
