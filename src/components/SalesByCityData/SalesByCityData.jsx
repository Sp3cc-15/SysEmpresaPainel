import React from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Legend,
  Export,
  Tooltip
} from 'devextreme-react/pie-chart';
import { DivModal } from './styled';
import { useState } from 'react';

const salesData = [
  { city: 'São Paulo', sales: 50000 },
  { city: 'Rio de Janeiro', sales: 30000 },
  { city: 'Belo Horizonte', sales: 20000 },
  { city: 'Salvador', sales: 15000 },
  { city: 'Curitiba', sales: 10000 }
];

const SalesByCityChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
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
      onClick={toggleModal}>Vendas por Cidades</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
              id="sales-by-city-chart"
              dataSource={salesData}
              type="doughnut"
              palette="Bright"
              title="Vendas por Cidade"
              style={{ width: '100%', height: '100%' }}
            >
              <Series argumentField="city" valueField="sales">
                <Label visible={true}>
                  <Connector visible={true} width={1} />
                </Label>
              </Series>
              <Size width="100%" height="100%"/>
              <Legend verticalAlignment="bottom" horizontalAlignment="center" />
              <Tooltip
                enabled={true}
                customizeTooltip={(pointInfo) => {
                  const { argument, value } = pointInfo;
                  return {
                    text: `${argument}: R$${value.toLocaleString()}`
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

export default SalesByCityChart;