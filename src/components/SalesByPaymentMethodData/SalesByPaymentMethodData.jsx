// SalesByPaymentMethodChart.jsx
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
  { paymentMethod: 'Cartão de Crédito', sales: 120000 },
  { paymentMethod: 'Pix', sales: 90000 },
  { paymentMethod: 'Boleto Bancário', sales: 75000 },
  { paymentMethod: 'Cartão de Débito', sales: 60000 },
  { paymentMethod: 'Transferência Bancária', sales: 45000 },
  { paymentMethod: 'Carteira Digital', sales: 30000 },
  { paymentMethod: 'Dinheiro', sales: 25000 },
  { paymentMethod: 'Cheque', sales: 20000 },
  { paymentMethod: 'QR Code', sales: 15000 },
  { paymentMethod: 'Crédito Loja', sales: 10000 }
];


const SalesByPaymentMethodChart = () => {
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
      onClick={toggleModal}>Vendas por Pagamento</button> 

      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            id="sales-by-payment-method-chart"
            dataSource={salesData}
            type="doughnut"
            palette="Bright"
            title="Vendas por Formas de Pagamento"
            style={{ width: '100%', height: '100%' }}
          >
            <Series argumentField="paymentMethod" valueField="sales">
              <Label visible={true}>
                <Connector visible={true} width={1} />
              </Label>
            </Series>
            <Size width="100%" height="100%" />
            <Legend verticalAlignment="bottom" horizontalAlignment="center" />
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

export default SalesByPaymentMethodChart;
