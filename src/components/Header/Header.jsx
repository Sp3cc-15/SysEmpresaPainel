import { useState } from 'react';
import Header from './styled';
import { Link } from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';

export const HeaderMain = ()=>{

    const [sideBar, setSideBar] = useState(false)

    const toggleSideBar = ()=>{
        setSideBar(!sideBar)
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('nome')
        console.log("token removido")
    }

    return (
        <div>
            <Header>
                <button onClick={toggleSideBar}>Menu</button>
                <button onClick={logout} to="/login">Sair</button>
        
            </Header>
            <SideBar isOpen={sideBar} toggle={toggleSideBar} />
        </div>
        
    )
}