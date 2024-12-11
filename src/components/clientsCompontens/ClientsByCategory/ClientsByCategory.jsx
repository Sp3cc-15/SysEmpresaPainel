import React, { useState } from 'react';
import { PieChart, Series, Legend, Size, Tooltip, Export, Title } from 'devextreme-react/pie-chart';
import { DivModal } from './styled';

const clientsByCategory = [
  { category: 'Categoria A', clients: 5000 },
  { category: 'Categoria B', clients: 3000 },
  { category: 'Categoria C', clients: 2000 },
  { category: 'Categoria D', clients: 1500 },
  { category: 'Categoria E', clients: 1400 },
  { category: 'Categoria F', clients: 1200 },
  { category: 'Categoria G', clients: 1100 }
];

const ClientsByCategoryChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <button style={{
        width: '200px',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '10px'
      }} 
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      onClick={toggleModal}>Clientes por Categoria</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            style={{ width: '100%', height: '100%' }}
            dataSource={clientsByCategory}
            type="doughnut"
          >
            <Title text="Distribuição de Clientes por Categoria" />
            <Size width="100%" height="100%" />
            <Series
              argumentField="category"
              valueField="clients"
              innerRadius={0.3}
              label={{
                visible: true,
                connector: {
                  visible: true
                },
                format: "fixedPoint",
                customizeText: (arg) => {
                  return `${arg.argumentText}: ${arg.valueText}`;
                }
              }}
            />
            <Legend horizontalAlignment="center" verticalAlignment="bottom" />
            <Tooltip
              enabled={true}
              customizeTooltip={(pointInfo) => {
                const { category, clients } = pointInfo.point.data;
                return {
                  text: `${category}: ${clients.toLocaleString()} clientes`
                };
              }}
            />
            <Export enabled={true} />
          </PieChart>
        </div>
      </DivModal>
    </div>
  );
};

export default ClientsByCategoryChart;
