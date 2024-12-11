import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Label, Export } from 'devextreme-react/chart';
import { useState } from 'react';
import { DivModal } from './styled';

const supplierSalesData = [
  { supplier: 'Grupo A', sales: 50000 },
  { supplier: 'Grupo B', sales: 45000 },
  { supplier: 'Grupo C', sales: 40000 },
  { supplier: 'Grupo D', sales: 35000 },
  { supplier: 'Grupo E', sales: 30000 },
  { supplier: 'Grupo F', sales: 25000 },
  { supplier: 'Grupo G', sales: 20000 },
  { supplier: 'Grupo H', sales: 15000 },
  { supplier: 'Grupo I', sales: 10000 },
  { supplier: 'Grupo J', sales: 5000 },
  { supplier: 'Grupo K', sales: 4500 },
  { supplier: 'Grupo L', sales: 4000 },
  { supplier: 'Grupo M', sales: 3500 },
  { supplier: 'Grupo N', sales: 3000 },
  { supplier: 'Grupo O', sales: 2500 },
  { supplier: 'Grupo P', sales: 2000 },
  { supplier: 'Grupo Q', sales: 1500 },
  { supplier: 'Grupo R', sales: 1000 },
  { supplier: 'Grupo S', sales: 500 },
  { supplier: 'Grupo T', sales: 250 },
];

const GroupSalesChart = () => {
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
      onClick={toggleModal}>Vendas por grupo</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart dataSource={supplierSalesData} rotated={true} style={{ width: '100%', height: '100%' }}>
            <Size width="100%" height="100%" />
            <ArgumentAxis>
              <Title text="Grupos" />
            </ArgumentAxis>
            <Title text="VENDA POR GRUPOS" />
            <ValueAxis />
            <Series
              valueField="sales"
              argumentField="supplier"
              name="Vendas"
              type="bar"
              color="#66ccff"
            >
              <Label visible={true} position="outside" customizeText={(pointInfo) => `R$${pointInfo.value.toLocaleString()}`} />
            </Series>
            <Legend visible={false} />
            <Tooltip enabled={true} customizeTooltip={(pointInfo) => {
              const { supplier, sales } = pointInfo.point.data;
              return {
                text: `${supplier}: R$${sales.toLocaleString()}`
              };
            }} />
            <Export enabled={true} />
          </Chart>
        </div>
      </DivModal>
    </div>
  );
};

export default GroupSalesChart;
