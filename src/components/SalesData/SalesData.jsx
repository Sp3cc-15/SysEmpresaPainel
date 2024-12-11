import React, { useState } from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Export, CommonSeriesSettings } from 'devextreme-react/chart';
import { DivModal } from './styled';

const salesData = [
  { month: 'Março', year: 2023, sales: 1000 },
  { month: 'Abril', year: 2023, sales: 15000 },
  { month: 'Maio', year: 2023, sales: 10000 },
  { month: 'Junho', year: 2023, sales: 5000 },
  { month: 'Julho', year: 2023, sales: 0 },
  { month: 'Agosto', year: 2023, sales: 5000 },
  { month: 'Setembro', year: 2023, sales: 10000 },
  { month: 'Março', year: 2024, sales: 20000 },
  { month: 'Abril', year: 2024, sales: 20000 },
  { month: 'Maio', year: 2024, sales: 15000 },
  { month: 'Junho', year: 2024, sales: 10000 },
  { month: 'Julho', year: 2024, sales: 20000 },
  { month: 'Agosto', year: 2024, sales: 20000 },
  { month: 'Setembro', year: 2024, sales: 15000 },
];

const SalesChart = () => {
  const salesData2023 = salesData.filter(data => data.year === 2023);
  const salesData2024 = salesData.filter(data => data.year === 2024);
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
      onClick={toggleModal}>Vendas por Mês</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart
            style={{ width: '100%', height: '100%' }}
            dataSource={salesData}
          >
            <Size width="100%" height="100%" />
            <ArgumentAxis
              valueMarginsEnabled={false}
            >
              <Title text="Meses" />
            </ArgumentAxis>
            <ValueAxis
              title="Vendas"
            />
            <Title text="Evolução das Vendas por Mês" />
            <CommonSeriesSettings
              argumentField="month"
              type="stackedLine"
            />
            <Series
              valueField="sales"
              name="2023"
              color="#ff6666"
              filterField="year"
              filterValue={2023}
            />
            <Series
              valueField="sales"
              name="2024"
              color="#6666ff"
              filterField="year"
              filterValue={2024}
            />
            <Legend verticalAlignment="bottom" horizontalAlignment="center" />
            <Tooltip
              enabled={true}
              customizeTooltip={(pointInfo) => {
                const { month, year, sales } = pointInfo.point.data;
                return {
                  text: `${month}, ${year}: R$${sales.toLocaleString()}`
                };
              }}
            />
            <Export enabled={true} />
          </Chart>
        </div>
      </DivModal>
    </div>
  );
};

export default SalesChart;
