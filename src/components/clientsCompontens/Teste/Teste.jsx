import React from 'react';
import { DataGrid, Column, Export, HeaderFilter } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';  // Certifique-se de importar o tema CSS do DevExtreme

const data = [
  { month: 'Jan', receitas: 597.24, despesas: 0, impostos: 50.00 },
  { month: 'Feb', receitas: 82.00, despesas: 0, impostos: 10.00 },
  { month: 'Mar', receitas: 89.09, despesas: -170.00, impostos: 20.00 },
  { month: 'Apr', receitas: 589.09, despesas: 0, impostos: 45.00 },
  { month: 'May', receitas: 31.50, despesas: 0, impostos: 5.00 },
  { month: 'Jun', receitas: 10205.50, despesas: 0, impostos: 900.00 },
  { month: 'Jul', receitas: 58.25, despesas: -500.00, impostos: 8.00 },
  { month: 'Aug', receitas: 66.24, despesas: 0, impostos: 6.00 },
  { month: 'Sep', receitas: 0, despesas: -875.00, impostos: 0 },
  { month: 'Oct', receitas: 610.60, despesas: 0, impostos: 50.00 },
  { month: 'Nov', receitas: 1.00, despesas: 0, impostos: 0.10 },
  { month: 'Dec', receitas: 0, despesas: 0, impostos: 0 }
];

const FinanceDataGrid = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <DataGrid
      dataSource={data}
      showBorders={true}
      rowAlternationEnabled={true}
      columnAutoWidth={true}
    >
      <HeaderFilter visible={true} />
      <Column dataField="month" caption="Mês" />
      <Column dataField="receitas" caption="Receitas (R$)" format={{ type: 'currency', precision: 2 }} />
      <Column dataField="despesas" caption="Despesas (R$)" format={{ type: 'currency', precision: 2 }} />
      <Column dataField="impostos" caption="Impostos (R$)" format={{ type: 'currency', precision: 2 }} />
      <Export enabled={true} />
    </DataGrid>
  </div>
);

export default FinanceDataGrid;
