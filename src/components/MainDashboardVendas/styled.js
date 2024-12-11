import styled from 'styled-components';

const MainSection = styled.main`
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-width: 70%;
    margin: 0 auto;

    @media (max-width: 768px) {
        max-width: 100%;
        margin: 0;
    }

    p {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .first {
        margin-bottom: 20px;

        form {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 10px;

            label {
                display: flex;
                flex-direction: column;
                font-size: 1rem;
            }

            input[type="date"],
            select {
                padding: 10px;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 5px;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjAwNSAyMkwxNiAxNS45OWw0Ljk5NS01Ljk5TDJNNy41IDZMMTMgMTIuNUMxMy44MzUgMTMuMzUgMTMgMTQgMTMgMTRMNy41IDgiIGZpbGw9IiMzMzMiLz4KPC9zdmc+Cg==') no-repeat right 10px center;
                background-size: 12px;
            }

            button {
                padding: 10px 20px;
                font-size: 1rem;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;

                &:hover {
                    background-color: #0056b3;
                }
            }
        }

        span {
            display: block;
            background-color: #F8D7DA;
            color: black;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
    }

    .second {
        display: flex;
        gap: 15px;

        @media (max-width: 768px) {
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            display: flex;
            flex-wrap: nowrap;
            gap: 10px;
        }

        section {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            @media (max-width: 768px) {
                flex: 0 0 300px; /* largura fixa para cada seção no celular */
            }

            div {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    margin-bottom: 10px;
                }

                p {
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                span {
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                svg {
                    font-size: 2rem;
                }
            }
        }
    }
`;

export default MainSection;
