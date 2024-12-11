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
  { state: 'São Paulo', sales: 50000 },
  { state: 'Rio de Janeiro', sales: 30000 },
  { state: 'Minas Gerais', sales: 20000 },
  { state: 'Bahia', sales: 15000 },
  { state: 'Paraná', sales: 10000 }
];

const SalesByStateChart = () => {
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
      onClick={toggleModal}>Vendas por Estado</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            id="sales-by-state-chart"
            dataSource={salesData}
            type="doughnut"
            palette="Bright"
            title="Vendas por Estado"
            style={{ width: '100%', height: '100%' }}
          >
            <Series argumentField="state" valueField="sales">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>
            <Size width="100%" height="100%" />
            <Legend 
              verticalAlignment="bottom" 
              horizontalAlignment="center" 
              itemTextPosition="right"
            />
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

export default SalesByStateChart;
