import React, { useState } from 'react';
import { PieChart, Series, Legend, Size, Tooltip, Export, Title } from 'devextreme-react/pie-chart';
import { DataGrid, Column, HeaderFilter, Export as DataGridExport } from 'devextreme-react/data-grid';
import { DivModal } from './styled';
import 'devextreme/dist/css/dx.light.css'; // Certifique-se de importar o tema CSS do DevExtreme

const clientsByCategory = [
  { category: 'Categoria A', clients: 5000 },
  { category: 'Categoria B', clients: 3000 },
  { category: 'Categoria C', clients: 2000 },
  { category: 'Categoria D', clients: 1500 },
  { category: 'Categoria E', clients: 1400 },
  { category: 'Categoria F', clients: 1200 },
  { category: 'Categoria G', clients: 1100 }
];

const ClientsByCategoryChart = () => {
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
      onClick={toggleModal}>Clientes por Categoria</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          {!isDataGridOpen ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h2>Distribuição de Clientes por Categoria</h2>
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
              <PieChart
                style={{ width: '100%', height: '100%' }}
                dataSource={clientsByCategory}
                type="doughnut"
              >
                <Title text="Distribuição de Clientes por Categoria" />
                <Size width="100%" height="100%" />
                <Series
                  argumentField="category"
                  valueField="clients"
                  innerRadius={0.3}
                  label={{
                    visible: true,
                    connector: {
                      visible: true
                    },
                    format: "fixedPoint",
                    customizeText: (arg) => {
                      return `${arg.argumentText}: ${arg.valueText}`;
                    }
                  }}
                />
                <Legend horizontalAlignment="center" verticalAlignment="bottom" />
                <Tooltip
                  enabled={true}
                  customizeTooltip={(pointInfo) => {
                    const { category, clients } = pointInfo.point.data;
                    return {
                      text: `${category}: ${clients.toLocaleString()} clientes`
                    };
                  }}
                />
                <Export enabled={true} formats={['PNG', 'JPEG', 'PDF', 'SVG', 'PRINT']} />
              </PieChart>
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
                dataSource={clientsByCategory}
                showBorders={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                style={{ width: '100%', height: 'calc(100vh - 200px)' }}
              >
                <HeaderFilter visible={true} />
                <Column dataField="category" caption="Categoria" />
                <Column dataField="clients" caption="Clientes" />
                <DataGridExport enabled={true} />
              </DataGrid>
            </div>
          )}
        </div>
      </DivModal>
    </div>
  );
};

export default ClientsByCategoryChart;
