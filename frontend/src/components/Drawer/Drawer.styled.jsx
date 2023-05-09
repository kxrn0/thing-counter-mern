import styled from "styled-components";

const SCDrawer = styled.div`
  /* background: #43fe73;
  padding: 20px;
  border-radius: 5px; */

  .top {
    /* background: #fe93b2;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px; */
  }

  .bottom {
    max-height: 0;
    transition: max-height var(--duration);
    overflow: hidden;

    .container {
      transform: translateY(-100%);
      transition: transform var(--duration);
    }

    &.open {
      max-height: var(--max-height);

      .container {
        transform: translateY(0);
      }
    }
  }
`;

export default SCDrawer;
