import React from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Export, Label } from 'devextreme-react/chart';
import { useState } from 'react';
import { DivModal } from './styled';

const productSalesData = [
  { product: 'Produto A', sales: 50000 },
  { product: 'Produto B', sales: 45000 },
  { product: 'Produto C', sales: 40000 },
  { product: 'Produto D', sales: 35000 },
  { product: 'Produto E', sales: 30000 },
  { product: 'Produto F', sales: 25000 },
  { product: 'Produto G', sales: 20000 },
  { product: 'Produto H', sales: 15000 },
  { product: 'Produto I', sales: 10000 },
  { product: 'Produto J', sales: 5000 },
  { product: 'Produto K', sales: 4500 },
  { product: 'Produto L', sales: 4000 },
  { product: 'Produto M', sales: 3500 },
  { product: 'Produto N', sales: 3000 },
  { product: 'Produto O', sales: 2500 },
  { product: 'Produto P', sales: 2000 },
  { product: 'Produto Q', sales: 1500 },
  { product: 'Produto R', sales: 1000 },
  { product: 'Produto S', sales: 500 },
  { product: 'Produto T', sales: 250 },
];

const ProductSalesChart = () => {
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
      onClick={toggleModal}>Vendas por Produtos</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart dataSource={productSalesData} rotated={true} style={{ width: '100%', height: '100%' }}>
            <Size width="100%" height="100%" />
            <ArgumentAxis>
              <Title text="Produtos" />
            </ArgumentAxis>
            <Title text="Vendas por Produtos" />
            <ValueAxis>
              <Title text="Vendas (em R$)" />
            </ValueAxis>
            <Series
              valueField="sales"
              argumentField="product"
              name="Vendas"
              type="bar"
              color="purple"
            >
              <Label visible={true} position="outside" customizeText={(pointInfo) => `R$${pointInfo.value.toLocaleString()}`} />
            </Series>
            <Legend visible={false} />
            <Tooltip enabled={true} customizeTooltip={(pointInfo) => {
              const { product, sales } = pointInfo.point.data;
              return {
                text: `${product}: R$${sales.toLocaleString()}`
              };
            }} />
            <Export enabled={true} />
          </Chart>
        </div>
      </DivModal>
    </div>
  );
};

export default ProductSalesChart;
