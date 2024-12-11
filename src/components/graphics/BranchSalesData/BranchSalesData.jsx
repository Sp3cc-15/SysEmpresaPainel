import React from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Label, Export } from 'devextreme-react/chart';
import { useState } from 'react';
import { DivModal } from './styled';

const supplierSalesData = [
  { supplier: 'Filial A', sales: 50000 },
  { supplier: 'Filial B', sales: 45000 },
  { supplier: 'Filial C', sales: 40000 },
  { supplier: 'Filial D', sales: 35000 },
  { supplier: 'Filial E', sales: 30000 },
  { supplier: 'Filial F', sales: 25000 },
  { supplier: 'Filial G', sales: 20000 },
  { supplier: 'Filial H', sales: 15000 },
  { supplier: 'Filial I', sales: 10000 },
  { supplier: 'Filial J', sales: 5000 },
  { supplier: 'Filial K', sales: 4500 },
  { supplier: 'Filial L', sales: 4000 },
  { supplier: 'Filial M', sales: 3500 },
  { supplier: 'Filial N', sales: 3000 },
  { supplier: 'Filial O', sales: 2500 },
  { supplier: 'Filial P', sales: 2000 },
  { supplier: 'Filial Q', sales: 1500 },
  { supplier: 'Filial R', sales: 1000 },
  { supplier: 'Filial S', sales: 500 },
  { supplier: 'Filial T', sales: 250 },
];

const BranchSalesChart = () => {
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
      onClick={toggleModal}>Vendas por Filial</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart dataSource={supplierSalesData} rotated={true} style={{ width: '100%', height: '100%' }}>
            <Size width="100%" height="100%" />
            <ArgumentAxis>
              <Title text="Filiais" />
            </ArgumentAxis>
            <Title text="Vendas por filial" />
            <ValueAxis />
            <Series
              valueField="sales"
              argumentField="supplier"
              name="Vendas"
              type="bar"
              color="blue"
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

export default BranchSalesChart;
