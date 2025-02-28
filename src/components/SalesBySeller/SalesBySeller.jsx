import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Importe os módulos do Highcharts sem atribuí-los a variáveis
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/full-screen';

import { DataGrid, Column, HeaderFilter, Export as DataGridExport } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { DivModal } from './styled';
import axios from 'axios';

const SalesChart = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataGridOpen, setIsDataGridOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [isValueView, setIsValueView] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDataGridOpen(false);
  };

  const toggleDataGrid = () => {
    setIsDataGridOpen(!isDataGridOpen);
  };

  const toggleView = () => {
    setIsValueView(!isValueView);
  };

  const fetchData = async () => {
    try {
      const dataToSend = {
        "IdEmpresa": 3, "IdCateg": 0, "CodCidade": 0, "IdUf": "AL", "IdFilial": 0,
        "IdVendedor": 0, "IdGrupo": 0, "IdFornecedor": 0, "DtIni": "2024-02-03", "DtFim": "2025-02-03"
      };
      const response = await axios.post('http://localhost:3000/api/porvendedor', dataToSend, {
        headers: { 'Content-Type': 'application/json' },
      });
      let parsedData = response.data;
      if (typeof parsedData === 'string') {
        parsedData = JSON.parse(parsedData);
      }
      setSalesData(parsedData);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Vendas por Vendedor',
    },
    tooltip: {
      pointFormatter: function () {
        return `${this.point.name}: <b>${isValueView ? 'R$' : ''}${Highcharts.numberFormat(this.point.y, isValueView ? 2 : 0)}</b>`;
      },
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: `{point.name}: ${isValueView ? 'R$' : ''}{point.y:.2f}`,
        },
      },
    },
    series: [
      {
        name: 'Vendas',
        colorByPoint: true,
        data: salesData.map((item, index) => ({
          name: item.Vendedor,
          y: parseFloat(isValueView ? item.ValorTotal : item.Qtd),
          color: Highcharts.getOptions().colors[index % 10],
        })),
      },
    ],
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'printChart',
            'separator',
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
            'separator',
            'downloadCSV',
            'downloadXLS',
            'viewData',
            'viewFullscreen'
          ]
        }
      }
    }

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <button
        style={{
          width: '200px',
          padding: '10px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: 'grey',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginBottom: '10px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6f6b6b')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'grey')}
        onClick={toggleModal}
      >
        Vendas por Vendedor
      </button>
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        {/* Alteração feita aqui: Adicionado estilo ao modalContent */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="modalContent"
          style={{ height: 'auto', maxHeight: '90vh', overflowY: 'auto' }}
        >
          {!isDataGridOpen ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <h2>Vendas por Vendedor</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        color: '#007bff',
                        backgroundColor: 'white',
                        border: '1px solid #007bff',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                      onClick={toggleView}
                    >
                      {isValueView ? 'Ver Quantidade' : 'Ver Valor'}
                    </button>
                    <button
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        color: '#007bff',
                        backgroundColor: 'white',
                        border: '1px solid #007bff',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                      onClick={toggleDataGrid}
                    >
                      Dados
                    </button>
                  </div>
                </div>
                <div style={{ width: '100%', height: '500px' }}>
                  <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
                <div className="legend-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {salesData.map((item, index) => (
                    <div key={index} className="legend-item" style={{ display: 'flex', alignItems: 'center', margin: '5px 10px' }}>
                      <span
                        className="legend-color"
                        style={{
                          backgroundColor: Highcharts.getOptions().colors[index % 10],
                          width: '20px',
                          height: '20px',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      ></span>
                      <span>{item.Vendedor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <button
                style={{
                  marginBottom: '10px',
                  padding: '6px 12px',
                  fontSize: '14px',
                  color: '#007bff',
                  backgroundColor: 'white',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={toggleDataGrid}
              >
                Voltar ao Gráfico
              </button>
              <DataGrid dataSource={salesData} showBorders={true} rowAlternationEnabled={true} columnAutoWidth={true} style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
                <HeaderFilter visible={true} />
                <Column dataField="Vendedor" caption="Vendedor" />
                <Column
                  dataField={isValueView ? 'ValorTotal' : 'Qtd'}
                  caption={isValueView ? 'Vendas (R$)' : 'Quantidade'}
                  format={isValueView ? { type: 'currency', precision: 2 } : undefined}
                />
                <DataGridExport enabled={true} allowExportSelectedData={false} />
              </DataGrid>
            </div>
          )}
        </div>
      </DivModal>
    </div>
  );
};

export default SalesChart;
