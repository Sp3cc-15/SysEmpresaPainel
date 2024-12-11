import SectionGraphic from './styled.js'
import SalesChart from '..//SalesData/SalesData.jsx'
import { useState } from 'react'

export const FirstSectionGraphic = ()=>{

    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = ()=>{
        setIsModalOpen(!isModalOpen)
    }

    return(
        <div className='container'>

            <button style={{
        width: '200px',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }} 
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
    onClick={toggleModal}>Evolução Mensal de Vendas</button>

                <SectionGraphic isModalOpen={isModalOpen} className='graphics'>
                
                    <div className='firstGraphic'>
                        <span onClick={toggleModal}>X</span>
                        <SalesChart setIsModalOpen/>
                    </div>
                </SectionGraphic>
            
        </div>
        
    )
}