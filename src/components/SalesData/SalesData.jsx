import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// Importações dos módulos do Highcharts, se necessário
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/full-screen';

import { DataGrid, Column, HeaderFilter, Export as DataGridExport } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Importa o tema CSS do DevExtreme
import { DivModal } from './styled';
import axios from 'axios';

const SalesChart = ({ startDate, endDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataGridOpen, setIsDataGridOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [isValueView, setIsValueView] = useState(true); // Estado para alternar entre valor e quantidade

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
        "IdEmpresa": 3,
        "IdCateg": 0,
        "CodCidade": 0,
        "IdUf": "AL",
        "IdFilial": 0,
        "IdVendedor": 0,
        "IdGrupo": 0,
        "IdFornecedor": 0,
        "DtIni": startDate,
        "DtFim": endDate
      };

      const response = await axios.post('http://localhost:3000/api/porevolucao', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    if (startDate && endDate) {
      const isValidDate = (dateString) => /^\d{4}-\d{2}-\d{2}$/.test(dateString);
      if (isValidDate(startDate) && isValidDate(endDate)) {
        fetchData();
      } else {
        console.error('Datas inválidas:', { startDate, endDate });
      }
    }
  }, [startDate, endDate]);

  // Preparando os dados para o Highcharts
  const prepareChartData = () => {
    const categories = [];
    const currentYearData = [];
    const previousYearData = [];

    salesData.forEach((item) => {
      categories.push(item.NomeMes);

      if (isValueView) {
        currentYearData.push({
          y: parseFloat(item.ValorTotal),
          custom: { year: item.Ano }
        });
        previousYearData.push({
          y: parseFloat(item.ValorTotalAnt),
          custom: { year: item.Ano - 1 }
        });
      } else {
        currentYearData.push({
          y: parseInt(item.Qtd),
          custom: { year: item.Ano }
        });
        previousYearData.push({
          y: parseInt(item.QtdAnt),
          custom: { year: item.Ano - 1 }
        });
      }
    });

    return { categories, currentYearData, previousYearData };
  };

  const { categories, currentYearData, previousYearData } = prepareChartData();

  // Obter anos para exibição
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Evolução das Vendas por Mês',
    },
    xAxis: {
      categories: categories,
      title: {
        text: 'Meses',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: isValueView ? 'Vendas (R$)' : 'Quantidade de Vendas',
      },
    },
    tooltip: {
      headerFormat: '<b>{point.key}</b><br>',
      pointFormatter: function() {
        return `<span style="color:${this.series.color}">●</span> ${this.series.name}: <b>` +
          (isValueView ? 'R$' : '') + Highcharts.numberFormat(this.y, 2) + '</b><br/>';
      },
    },
    plotOptions: {
      column: {
        grouping: true,
        shadow: false,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: `Ano Atual (${currentYear})`,
        data: currentYearData,
        color: '#ff6666',
      },
      {
        name: `Ano Anterior (${previousYear})`,
        data: previousYearData,
        color: '#6666ff',
      },
    ],
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
    },
    exporting: {
      enabled: true,
    },
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
        Vendas por Mês
      </button>

      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
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
                  <h2>Evolução das Vendas por Mês</h2>
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
              </div>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
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
              <DataGrid
                dataSource={salesData}
                showBorders={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                style={{ width: '100%', height: 'calc(100vh - 200px)' }}
              >
                <HeaderFilter visible={true} />
                <Column dataField="NomeMes" caption="Mês" />
                <Column dataField="Ano" caption="Ano" />
                <Column
                  dataField="ValorTotal"
                  caption="Vendas Atuais (R$)"
                  format={{ type: 'currency', precision: 2 }}
                />
                <Column
                  dataField="ValorTotalAnt"
                  caption="Vendas Anteriores (R$)"
                  format={{ type: 'currency', precision: 2 }}
                />
                <Column dataField="Qtd" caption="Quantidade Atual" />
                <Column dataField="QtdAnt" caption="Quantidade Anterior" />
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
