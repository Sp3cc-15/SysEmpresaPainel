import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Importa os módulos do Highcharts para exportação
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/full-screen';

import { DataGrid, Column, HeaderFilter, Export as DataGridExport } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Importa o tema CSS do DevExtreme
import { DivModal } from './styled';
import axios from 'axios';

const SalesByCategoryChart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataGridOpen, setIsDataGridOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [isValueView, setIsValueView] = useState(true); // Estado para alternar entre valor e quantidade

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsDataGridOpen(false); // Fecha o DataGrid ao fechar o modal
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
        "DtIni": "2024-02-03",
        "DtFim": "2025-02-03"
      };

      const response = await axios.post('http://localhost:3000/api/porcategoria', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let parsedData = response.data;
      if (typeof parsedData === 'string') {
        parsedData = JSON.parse(parsedData);
      }

      // Ordena os dados uma vez com base no ValorTotal
      const sortedData = parsedData.sort((a, b) => parseFloat(b.ValorTotal) - parseFloat(a.ValorTotal));

      setSalesData(sortedData);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepara os dados para o Highcharts sem reordenar
  const prepareChartData = () => {
    const data = salesData.map(item => ({
      name: item.DescCateg,
      y: isValueView ? parseFloat(item.ValorTotal) : parseInt(item.Qtd)
    }));

    return data;
  };

  const chartData = prepareChartData();

  const chartOptions = {
    chart: {
      type: 'pie',
      height: 500,
    },
    title: {
      text: 'Vendas por Categoria',
    },
    tooltip: {
      pointFormat: `<b>{point.name}</b>: ${isValueView ? 'R$' : ''}{point.y:.2f} ${isValueView ? '' : 'unidades'} ({point.percentage:.1f}%)`
    },
    plotOptions: {
      pie: {
        innerSize: '50%', // Transforma o gráfico em rosca
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: `{point.name}: ${isValueView ? 'R$' : ''}{point.y:.2f}`,
        },
        showInLegend: true
      }
    },
    series: [{
      name: isValueView ? 'Vendas' : 'Quantidade',
      colorByPoint: true,
      data: chartData,
    }],
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
    },
    credits: {
      enabled: false
    }
  };

  return (
    <div className='container'>
      <button style={{
        width: '200px',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: 'grey',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      }} 
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6f6b6b'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'gray'}
      onClick={toggleModal}>Vendas por Categoria</button>
      
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div
          onClick={(e) => e.stopPropagation()}
          className='modalContent'
          style={{ height: 'auto', maxHeight: '90vh', overflowY: 'auto', width: '90%', margin: '0 auto' }}
        >
          {!isDataGridOpen ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h2>Vendas por Categoria</h2>
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
                  onClick={toggleView}>{isValueView ? 'Ver Quantidade' : 'Ver Valor'}</button>
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
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </div>
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
                dataSource={salesData}
                showBorders={true}
                rowAlternationEnabled={true}
                columnAutoWidth={true}
                style={{ width: '100%', height: 'calc(90vh - 200px)' }}
              >
                <HeaderFilter visible={true} />
                <Column dataField="DescCateg" caption="Categoria" />
                <Column dataField="Qtd" caption="Quantidade" />
                <Column dataField="ValorTotal" caption="Vendas (R$)" format={{ type: 'currency', precision: 2 }} />
                <DataGridExport enabled={true} allowExportSelectedData={false} />
              </DataGrid>
            </div>
          )}
        </div>
      </DivModal>
    </div>
  );
};

export default SalesByCategoryChart;
