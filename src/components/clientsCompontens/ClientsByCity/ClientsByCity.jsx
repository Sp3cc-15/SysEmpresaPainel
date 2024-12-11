import React, { useState } from 'react';
import { PieChart, Series, Legend, Size, Tooltip, Export, Title } from 'devextreme-react/pie-chart';
import { DivModal } from './styled';

const clientsByCity = [
  { city: 'São Paulo', clients: 2000 },
  { city: 'Rio de Janeiro', clients: 1500 },
  { city: 'Belo Horizonte', clients: 1000 },
  { city: 'Porto Alegre', clients: 800 },
  { city: 'Curitiba', clients: 700 },
  { city: 'Recife', clients: 600 },
  { city: 'Salvador', clients: 500 }
];

const ClientsByCityChart = () => {
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
      onClick={toggleModal}>Clientes por Cidade</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            style={{ width: '100%', height: '100%' }}
            dataSource={clientsByCity}
            type="doughnut"
          >
            <Title text="Distribuição de Clientes por Cidade" />
            <Size width="100%" height="100%" />
            <Series
              argumentField="city"
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
                const { city, clients } = pointInfo.point.data;
                return {
                  text: `${city}: ${clients.toLocaleString()} clientes`
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

export default ClientsByCityChart;
