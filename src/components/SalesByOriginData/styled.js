import styled from "styled-components";

export const DivModal = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')} !important;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;

  .modalContent {
    background-color: white;
    width: 90%;
    max-width: 1000px;
    height: 90%;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
