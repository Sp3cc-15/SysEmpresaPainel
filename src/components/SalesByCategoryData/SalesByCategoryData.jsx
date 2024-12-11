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
  { category: 'Eletrônicos', sales: 120000 },
  { category: 'Roupas', sales: 90000 },
  { category: 'Alimentos', sales: 75000 },
  { category: 'Móveis', sales: 60000 },
  { category: 'Brinquedos', sales: 45000 },
  { category: 'Livros', sales: 30000 },
  { category: 'Beleza', sales: 25000 },
  { category: 'Esportes', sales: 20000 },
  { category: 'Automóveis', sales: 15000 },
  { category: 'Jardinagem', sales: 10000 }
];

const SalesByCategoryChart = () => {
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
      onClick={toggleModal}>Vendas por Categoria</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            id="sales-by-category-chart"
            dataSource={salesData}
            type="doughnut"
            palette="Bright"
            title="Vendas por Categoria"
            style={{ width: '100%', height: '100%' }}
          >
            <Series argumentField="category" valueField="sales">
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

export default SalesByCategoryChart;
