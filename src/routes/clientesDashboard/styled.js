import styled from "styled-components";

export const GraphicsContent = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding-bottom: 5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    & > div {
      flex: 1 0 16%; /* Ajusta para aproximadamente 5 itens por linha */
      margin: 10px; /* Espaçamento entre os itens */
      box-sizing: border-box; /* Inclui padding e border no tamanho total do item */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
