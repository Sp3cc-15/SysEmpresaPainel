import React, { useState } from 'react';
import { PieChart, Series, Legend, Size, Tooltip, Export, Title } from 'devextreme-react/pie-chart';
import { DivModal } from './styled';

const clientsByState = [
  { state: 'São Paulo', clients: 5000 },
  { state: 'Rio de Janeiro', clients: 3000 },
  { state: 'Minas Gerais', clients: 2000 },
  { state: 'Rio Grande do Sul', clients: 1500 },
  { state: 'Paraná', clients: 1400 },
  { state: 'Pernambuco', clients: 1200 },
  { state: 'Bahia', clients: 1100 }
];

const ClientsByStateChart = () => {
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
      onClick={toggleModal}>Clientes por Estado</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            style={{ width: '100%', height: '100%' }}
            dataSource={clientsByState}
            type="doughnut"
          >
            <Title text="Distribuição de Clientes por Estado" />
            <Size width="100%" height="100%" />
            <Series
              argumentField="state"
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
                const { state, clients } = pointInfo.point.data;
                return {
                  text: `${state}: ${clients.toLocaleString()} clientes`
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

export default ClientsByStateChart;
