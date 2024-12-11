import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Label, Export } from 'devextreme-react/chart';
import { useState } from 'react';
import { DivModal } from './styled';

const supplierSalesData = [
  { supplier: 'Fornecedor A', sales: 50000 },
  { supplier: 'Fornecedor B', sales: 45000 },
  { supplier: 'Fornecedor C', sales: 40000 },
  { supplier: 'Fornecedor D', sales: 35000 },
  { supplier: 'Fornecedor E', sales: 30000 },
  { supplier: 'Fornecedor F', sales: 25000 },
  { supplier: 'Fornecedor G', sales: 20000 },
  { supplier: 'Fornecedor H', sales: 15000 },
  { supplier: 'Fornecedor I', sales: 10000 },
  { supplier: 'Fornecedor J', sales: 5000 },
  { supplier: 'Fornecedor K', sales: 4500 },
  { supplier: 'Fornecedor L', sales: 4000 },
  { supplier: 'Fornecedor M', sales: 3500 },
  { supplier: 'Fornecedor N', sales: 3000 },
  { supplier: 'Fornecedor O', sales: 2500 },
  { supplier: 'Fornecedor P', sales: 2000 },
  { supplier: 'Fornecedor Q', sales: 1500 },
  { supplier: 'Fornecedor R', sales: 1000 },
  { supplier: 'Fornecedor S', sales: 500 },
  { supplier: 'Fornecedor T', sales: 250 },
];

const SupplierSalesChart = () => {
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
      onClick={toggleModal}>Vendas por Fornecedor</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart dataSource={supplierSalesData} rotated={true} style={{ width: '100%', height: '100%' }}>
            <Size width="100%" height="100%" />
            <ArgumentAxis>
              <Title text="Fornecedores" />
            </ArgumentAxis>
            <Title text="Vendas por fornecedores" />
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

export default SupplierSalesChart;
