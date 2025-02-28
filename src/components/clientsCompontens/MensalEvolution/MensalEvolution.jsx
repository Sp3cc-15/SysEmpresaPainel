import React, { useState } from 'react';
import { Chart, Series, ArgumentAxis, ValueAxis, Title, Legend, Size, Tooltip, Export, CommonSeriesSettings } from 'devextreme-react/chart';
import { DataGrid, Column, HeaderFilter, Export as DataGridExport } from 'devextreme-react/data-grid';
import { DivModal } from './styled';
import 'devextreme/dist/css/dx.light.css'; // Certifique-se de importar o tema CSS do DevExtreme

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataGridOpen, setIsDataGridOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDataGridOpen(false); // Fecha o DataGrid ao fechar o modal
  };

  const toggleDataGrid = () => {
    setIsDataGridOpen(!isDataGridOpen);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <button style={{
        width: '200px',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: 'grey',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '10px'
      }} 
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6f6b6b'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'grey'}
      onClick={toggleModal}>Novos Clientes por Mês</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          {!isDataGridOpen ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h2>Evolução dos Novos Clientes por Mês</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    color: '#007bff',
                    backgroundColor: 'white',
                    border: '1px solid #007bff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={toggleDataGrid}>Dados</button>
                </div>
              </div>
              <Chart
                style={{ width: '100%', height: '100%' }}
                dataSource={customerData}
              >
                <Size width="100%" height="100%" />
                <ArgumentAxis valueMarginsEnabled={false}>
                  <Title text="Meses" />
                </ArgumentAxis>
                <ValueAxis title="Novos Clientes" />
                <CommonSeriesSettings argumentField="month" type="stackedLine" />
                <Series valueField="customers" name="2023" color="#ff6666" />
                <Series valueField="customers" name="2024" color="#6666ff" />
                <Legend verticalAlignment="bottom" horizontalAlignment="center" />
                <Tooltip
                  enabled={true}
                  customizeTooltip={(pointInfo) => {
                    const { month, year, customers } = pointInfo.point.data;
                    return { text: `${month}, ${year}: ${customers.toLocaleString()} novos clientes` };
                  }}
                />
                <Export enabled={true} formats={['PNG', 'JPEG', 'PDF', 'SVG', 'PRINT']} />
              </Chart>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <button style={{
                marginBottom: '10px',
                padding: '6px 12px',
                fontSize: '14px',
                color: '#007bff',
                backgroundColor: 'white',
                border: '1px solid #007bff',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              onClick={toggleDataGrid}>Voltar ao Gráfico</button>
              <DataGrid
                dataSource={customerData}
                showBorders={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                style={{ width: '100%', height: 'calc(100vh - 200px)' }}
              >
                <HeaderFilter visible={true} />
                <Column dataField="month" caption="Mês" />
                <Column dataField="year" caption="Ano" />
                <Column dataField="customers" caption="Novos Clientes" />
                <DataGridExport enabled={true} />
              </DataGrid>
            </div>
          )}
        </div>
      </DivModal>
    </div>
  );
};

export default CustomerChart;
