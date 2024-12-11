import React, { useState } from 'react';
import { PieChart, Series, Legend, Size, Tooltip, Export, Title } from 'devextreme-react/pie-chart';
import { DivModal } from './styled';

const clientsByNeighborhood = [
  { neighborhood: 'Bairro A', clients: 5000 },
  { neighborhood: 'Bairro B', clients: 3000 },
  { neighborhood: 'Bairro C', clients: 2000 },
  { neighborhood: 'Bairro D', clients: 1500 },
  { neighborhood: 'Bairro E', clients: 1400 },
  { neighborhood: 'Bairro F', clients: 1200 },
  { neighborhood: 'Bairro G', clients: 1100 }
];

const ClientsByNeighborhoodChart = () => {
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
      onClick={toggleModal}>Clientes por Bairro</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            style={{ width: '100%', height: '100%' }}
            dataSource={clientsByNeighborhood}
            type="doughnut"
          >
            <Title text="Distribuição de Clientes por Bairro" />
            <Size width="100%" height="100%" />
            <Series
              argumentField="neighborhood"
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
                const { neighborhood, clients } = pointInfo.point.data;
                return {
                  text: `${neighborhood}: ${clients.toLocaleString()} clientes`
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

export default ClientsByNeighborhoodChart;
