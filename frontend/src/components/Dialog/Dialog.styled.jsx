import styled from "styled-components";

const SCDialog = styled.div`
  --duration: 0.33s;
  position: fixed;
  inset: 0;
  transition: opacity var(--duration);
  z-index: 2;

  .backdrop {
    position: absolute;
    inset: 0;
  }

  .backdrop.transparent {
    background: #0000007f;
  }

  .container {
    position: absolute;
    top: -100vh;
    left: 50%;
    transform: translateX(-50%);
    transition: transform var(--duration);
    display: grid;
    place-items: center;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  &.hidden {
    pointer-events: none;
    opacity: 0;
  }

  &.shown {
    .container {
      transform: translate(-50%, calc(150vh - 50%));
    }
  }
`;

export default SCDialog;
