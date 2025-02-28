import styled from "styled-components";

export const FooterStyle = styled.footer`
  width: 100%;
  background-color: #F0F0F0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  /* transform: translateY(100%); */
  /* transition: transform 0.3s ease-in-out; */
  z-index: 0;


  &.show {
    transform: translateY(0);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }
`;
