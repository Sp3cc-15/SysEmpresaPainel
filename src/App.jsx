import React, { useState, useEffect } from 'react';
import {HeaderMain} from './components/Header/Header.jsx'
// import {FirstSection} from './components/MainDashboard/MainDashboard.jsx'
import { GraphicsContent } from './App.js';
import { Content } from './components/SideBar/styled.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';

function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          console.log("token não existe")
        }
      }, []);

  return (
    <Content isOpen={isOpen}>
      <ToastContainer />
      <HeaderMain/>
      <Outlet />
      <Footer/>
    </Content>
  )
}

export default App
