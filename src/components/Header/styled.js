import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: grey;
    padding: 10px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid #dee2e6;

    button {
        background-color: #fff;
        color: #6f6b6b;
        border: 2px solid #6f6b6b;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #6f6b6b;
            color: #fff;
        }
    }

    a {
        /* max-width: 10px; */
        background-color: #dc3545;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        text-decoration: none;
        transition: background-color 0.3s;

        &:hover {
            background-color: #c82333;
        }
    }
`;

export default Header;
