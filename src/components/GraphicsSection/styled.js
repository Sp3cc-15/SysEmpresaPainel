import styled from "styled-components";


const SectionGraphic = styled.section`
    justify-content: space-between;
    display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
    

    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    

    .firstGraphic{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 800px;
        background-color: white;
        margin: 0 auto;
        width: 90%;
        flex-direction: column;

        span{
            cursor: pointer;
            color: red;
            width: 90%;
            margin-top: 1rem;
            display: flex;
            justify-content: flex-end;
            /* position: fixed;
            top: 0;
            right: 0; */
        }
    }

`

export default SectionGraphic