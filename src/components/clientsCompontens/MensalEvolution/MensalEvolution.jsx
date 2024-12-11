import React, { useState } from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Export, CommonSeriesSettings } from 'devextreme-react/chart';
import { DivModal } from './styled';

const customerData = [
  { month: 'Março', year: 2023, customers: 50 },
  { month: 'Abril', year: 2023, customers: 150 },
  { month: 'Maio', year: 2023, customers: 100 },
  { month: 'Junho', year: 2023, customers: 75 },
  { month: 'Julho', year: 2023, customers: 60 },
  { month: 'Agosto', year: 2023, customers: 80 },
  { month: 'Setembro', year: 2023, customers: 90 },
  { month: 'Março', year: 2024, customers: 200 },
  { month: 'Abril', year: 2024, customers: 250 },
  { month: 'Maio', year: 2024, customers: 220 },
  { month: 'Junho', year: 2024, customers: 180 },
  { month: 'Julho', year: 2024, customers: 210 },
  { month: 'Agosto', year: 2024, customers: 230 },
  { month: 'Setembro', year: 2024, customers: 240 },
];

const CustomerChart = () => {
  const customerData2023 = customerData.filter(data => data.year === 2023);
  const customerData2024 = customerData.filter(data => data.year === 2024);
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
      onClick={toggleModal}>Novos Clientes por Mês</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <Chart
            style={{ width: '100%', height: '100%' }}
            dataSource={customerData}
          >
            <Size width="100%" height="100%" />
            <ArgumentAxis
              valueMarginsEnabled={false}
            >
              <Title text="Meses" />
            </ArgumentAxis>
            <ValueAxis
              title="Novos Clientes"
            />
            <Title text="Evolução dos Novos Clientes por Mês" />
            <CommonSeriesSettings
              argumentField="month"
              type="stackedLine"
            />
            <Series
              valueField="customers"
              name="2023"
              color="#ff6666"
              filterField="year"
              filterValue={2023}
            />
            <Series
              valueField="customers"
              name="2024"
              color="#6666ff"
              filterField="year"
              filterValue={2024}
            />
            <Legend verticalAlignment="bottom" horizontalAlignment="center" />
            <Tooltip
              enabled={true}
              customizeTooltip={(pointInfo) => {
                const { month, year, customers } = pointInfo.point.data;
                return {
                  text: `${month}, ${year}: ${customers.toLocaleString()} novos clientes`
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

export default CustomerChart;
