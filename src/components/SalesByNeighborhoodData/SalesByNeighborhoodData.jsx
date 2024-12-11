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
  { neighborhood: 'Vila Andrade', sales: 1191 },
  { neighborhood: 'Bela Vista', sales: 989 },
  { neighborhood: 'Tatuapé', sales: 911 },
  { neighborhood: 'Perdizes', sales: 894 },
  { neighborhood: 'Brooklin', sales: 828 },
  { neighborhood: 'Sacomã', sales: 806 },
  { neighborhood: 'Santo Amaro', sales: 793 },
  { neighborhood: 'Jabaquara', sales: 681 },
  { neighborhood: 'Ipiranga', sales: 656 },
  { neighborhood: 'República', sales: 639 }
];

const SalesByNeighborhoodChart = () => {
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
      onClick={toggleModal}>Vendas por Bairro</button>
      <DivModal onClick={toggleModal} isModalOpen={isModalOpen}>
        <div onClick={(e) => e.stopPropagation()} className='modalContent'>
          <PieChart
            id="sales-by-neighborhood-chart"
            dataSource={salesData}
            type="doughnut"
            palette="Bright"
            title="Vendas por Bairro"
            style={{ width: '100%', height: '100%' }}
          >
            <Series argumentField="neighborhood" valueField="sales">
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
                  text: `${argument}: ${value.toLocaleString()} vendas`
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

export default SalesByNeighborhoodChart;
