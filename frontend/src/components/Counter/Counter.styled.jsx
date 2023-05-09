import styled from "styled-components";

const SCCounter = styled.div`
  --background: #1b1b1f;
  width: 500px;

  .top {
    background: var(--background);
    display: flex;
    align-items: center;
    gap: 50px;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    transition: border-radius 0.33s;

    &.open {
      border-top-left-radius: 50px;
      border-bottom-left-radius: 0;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 0;
    }

    .container {
      flex-grow: 1;
      text-align: center;

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        text-decoration: none;

        .count {
          display: flex;
          flex-direction: column;
          gap: 10px;

          p {
            color: azure;
            font-size: 18px;
          }

          button {
            background: none;
            color: #f8ecec;
            border: none;
            font-size: 20px;
          }
        }

        .name {
          background: #393d4a;
          color: azure;
          padding: 5px;
          border-radius: 5px;
          font-size: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .image {
          width: 100px;
          height: 100px;
          border-radius: 100%;

          img {
            max-width: 100px;
            max-height: 100px;
          }
        }
      }
    }

    .button-of-disclosure {
      background: none;
      color: #8eb0ec;
      border: none;
      width: 25px;
      height: 25px;
      font-size: 23px;
      margin-right: 10px;
    }
  }

  .bottom {
    background: var(--background);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .container {
      color: azure;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;

      .tag {
        background: #5f6bcecc;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
`;

export default SCCounter;
