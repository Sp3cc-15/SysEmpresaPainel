import styled from 'styled-components';

const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-250px')}; /* Largura da sidebar */
    width: 250px;
    height: 100%;
    background-color: #333;
    transition: left 0.3s ease;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    color: white;

    li{
        cursor: pointer;
    }

    .closeBTN{
        display: flex;
        justify-content: flex-end;
    }

    svg {
        cursor: pointer;
    }

    .menu-item {
        cursor: pointer;
        padding: 1rem;
        border-bottom: 1px solid #444;
        list-style: none;
    }
`;

const Submenu = styled.ul`
    display: ${({ isOpenMenu }) => (isOpenMenu ? 'block' : 'none')};
    padding-left: 1rem;
`

const Content = styled.div`
    margin-left: ${({ isOpen }) => (isOpen ? '250px' : '0')};
    /* margin-left: 250px; */
    transition: margin-left 0.3s ease;
    width: 100%;
`;

export { SidebarContainer, Submenu, Content };
