import styled from "styled-components";

const SCImage = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  pointer-events: none;
  overflow: hidden;

  .background {
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
    filter: blur(3px);
    position: absolute;
    inset: 0;
  }

  img {
    position: relative;
  }
`;

export default SCImage;
