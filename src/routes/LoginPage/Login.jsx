import React, {useEffect} from 'react'
import MainLogin from './styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const url = "https://auth.sysempresa.com.br"

  const tokenGenerator = ()=>{
    return uuidv4()
  }

  const login = (async ()=>{

    try {

      const response = await axios.post(`${url}/Login`, {
        Email: email,
        Password: senha
      })
      if(response.status == 200){
        toast.success("Logado com sucesso!")
        const token = tokenGenerator()
        const nome = response.data.NOME
        localStorage.setItem('token', token)
        localStorage.setItem('nome', nome)
        navigate('/vendas');
      }

      
    } catch (error) {
      if(error.response){
        toast.error(error.response.data)
        console.log(error.response.data)
      }
    }
  })

  // const response = axios.post(url)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("token existente")
      navigate('/vendas'); // Redireciona para a página home se o token existir
    }
  }, [navigate]);


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(typeof email, typeof senha)
        login()
        // Lógica de login aqui
    };

    const togglePasswordVisibility = ()=>{
      setShowPassword(!showPassword)
    }

 

  return (
    <MainLogin>
        <section>
            <h1>Login</h1>
            <img src="/src/img/SysEmpresa.png" alt="teste" />

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Email' onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
                  <div className='inputs'>
                    <input type={showPassword ? "text" : "password"} placeholder='Senha' onChange={(event)=>{
                      setSenha(event.target.value)
                    }} />
                    <div className='showPassword'>
                      <label htmlFor="showPassword">mostrar senha</label>
                      <input onClick={togglePasswordVisibility} type="checkbox" name="showPassword" id="showPassword" />
                    </div>
                  </div>

                <button>Entrar</button>
            </form>

        </section>
        <ToastContainer />
    </MainLogin>
  )
}

export default Login