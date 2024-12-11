import { PieChart, Series, Label, Connector, Size, Legend, Tooltip, Title, Export } from 'devextreme-react/pie-chart';
import { useState } from 'react';
import { DivModal } from './styled';

const salesData = [
  { vendor: 'Vendedor A', sales: 50000 },
  { vendor: 'Vendedor B', sales: 30000 },
  { vendor: 'Vendedor C', sales: 20000 },
  { vendor: 'Vendedor D', sales: 15000 },
  { vendor: 'Vendedor E', sales: 10000 },
];

const SalesDonutChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
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
      onClick={toggleModal}>Vendas por vendedor</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            type="doughnut"
            dataSource={salesData}
            palette="Bright"
            title="Vendas por Vendedor"
            style={{ width: '100%', height: '100%' }}
          >
            <Title text="Vendas por Vendedor" />
            <Size width="100%" height="100%" />
            <Series argumentField="vendor" valueField="sales">
              <Label visible={true} customizeText={(pointInfo) => `R$${pointInfo.value.toLocaleString()}`}>
                <Connector visible={true} />
              </Label>
            </Series>
            <Legend verticalAlignment="bottom" horizontalAlignment="center" />
            <Tooltip enabled={true} customizeTooltip={(pointInfo) => {
              const { argument, value } = pointInfo;
              return {
                text: `${argument}: R$${value.toLocaleString()}`
              };
            }} />
            <Export enabled={true} />
          </PieChart>
        </div>
      </DivModal>
    </div>
  );
};

export default SalesDonutChart;
