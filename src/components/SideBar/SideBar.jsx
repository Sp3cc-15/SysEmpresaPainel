import { useState } from 'react';
import { SidebarContainer, Submenu } from './styled';
import { GrClose } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export const SideBar = ({ isOpen, toggle }) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const navigate = useNavigate();

    const toggleSubMenu = () => {
        setIsOpenMenu(!isOpenMenu);
        console.log(isOpenMenu);
    };

    const handleNavigate = (path) => {
        navigate(path);
        toggle(); // Fecha a sidebar após a navegação
    };

    const name = localStorage.getItem("nome")

    return (
        <SidebarContainer isOpen={isOpen}>
            <div className='closeBTN'>
            <GrClose onClick={toggle} />
            </div>
            <div>
                <div>
                    <h2>{name}</h2>
                    <p>Técnico de Suporte</p>
                </div>
                <ul>
                    <li className="menu-item" onClick={toggleSubMenu}>
                        Dashboard
                    </li>
                    <Submenu isOpenMenu={isOpenMenu}>
                        <li onClick={()=> handleNavigate('/vendas')} className="menu-item">Vendas</li>
                        <li onClick={()=> handleNavigate('/clientes')} className="menu-item">Clientes</li>
                        <li className="menu-item">Fluxo de Caixa</li>
                        <li className="menu-item">A Receber</li>
                        <li className="menu-item">A Pagar</li>
                    </Submenu>
                </ul>
                <ul>
                    <li>vendas</li>
                    <li>compras</li>
                    <li>financeiro</li>
                    <li>assist técnica</li>
                </ul>
            </div>
        </SidebarContainer>
    );
};
