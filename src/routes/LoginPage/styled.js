import styled from "styled-components";


const MainLogin = styled.main`
    background-color: #4ABFA4;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    

    section{
        background-color: white;
        height: 70%;
        width: 60%;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5rem;
        background-color: black;

        img{
            width: 500px;
        }

        h1{
            color: #4EABC1;
            font-size: 2rem;
        }
        
        form{
            /* background-color: gray; */
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            border-radius: 0.5rem;
            gap: 1rem;

            button{
                border: none;
                background-color: #0B847A;
                border-radius: 0.3rem;
                width: 30%;
                font-size: 2vw;
                color: white;
                cursor: pointer;
            }
            button:hover{
                background-color: #0f776e;
            }
            
            input{
                width: 90%;
                height: 4rem;
                border: 1px solid gray;
                padding-left: 1rem;
            }

            .inputs{
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                margin-bottom: 3rem;


                label{
                    color: white;
                }
                

                .showPassword{
                    width: 90%;
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;

                    input[type="checkbox"]{
                        width: 1.5rem;
                        height: 1.5rem;
                        cursor: pointer;
                    }
                    }
            }  
            }

            
        }
        @media (max-width: 768px) {
            section{
                width: 98%;
                padding: 1rem;

                 form{

                button{
                    width: 90%;
                    height: 10%;
                    font-size: 1rem;
                }
            }
            }

        }

`

export default MainLogin