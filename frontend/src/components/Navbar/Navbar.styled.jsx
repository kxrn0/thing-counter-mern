import styled from "styled-components";

const SCNavbar = styled.nav`
  background: #acadc8;
  padding: 20px;

  a {
    text-decoration: none;
  }

  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .sidebar-control {
      display: none;
    }

    .links {
      background: #2fff00;
      display: flex;
      gap: 20px;
    }

    @media screen and (max-width: 500px) {
      justify-content: flex-end;

      .sidebar-control {
        display: block;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1;
        transition: transform 0.33s;
      }

      .links {
        flex-direction: column;
        padding: 100px 20px;
        position: fixed;
        top: 0;
        right: 100%;
        bottom: 0;
        width: 300px;
        transition: transform 0.33s;
      }

      &.open {
        .sidebar-control {
          transform: translate(225px, 10px);
        }

        .links {
          transform: translate(100%);
        }
      }
    }
  }

  .tags-section {
    .tags {
      background: #e6697d;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 100%;
      width: 300px;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      padding: 100px 20px;
      transition: transform 0.33s;
      z-index: 1;
    }

    .tags-control {
      position: fixed;
      top: 100px;
      right: 50px;
      transition: transform 0.33s;
      z-index: 1;
    }

    &.open {
      .tags {
        transform: translate(-100%);
      }

      .tags-control {
        transform: translate(-200px, -75px);
      }
    }
  }
`;

export default SCNavbar;
