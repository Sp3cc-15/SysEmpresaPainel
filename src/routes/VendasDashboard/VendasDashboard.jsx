import { GraphicsContent } from './styled.js';
import SalesDonutChart from '../../components/SalesBySeller/SalesBySeller.jsx';
import ProductSalesChart from '../../components/ProductSalesChart/ProductSalesChart.jsx';
import GroupSalesChart from '../../components/GroupSalesData/GroupSalesData.jsx'
import BranchSalesDonutChart from '../../components/graphics/BranchSalesData/BranchSalesData.jsx'
import SupplierSalesChart from '../../components/SupplierSalesData/SupplierSalesData.jsx';
import SalesByCityChart from '../../components/SalesByCityData/SalesByCityData.jsx';
import SalesByStateChart from '../../components/SalesByState/SalesByState.jsx';
import SalesByCategoryChart from '../../components/SalesByCategoryData/SalesByCategoryData';
import SalesByNeighborhoodChart from '../../components/SalesByNeighborhoodData/SalesByNeighborhoodData.jsx';
import SalesByOriginChart from '../../components/SalesByOriginData/SalesByOriginData.jsx';
import SalesByPaymentMethodChart from '../../components/SalesByPaymentMethodData/SalesByPaymentMethodData.jsx';
import {FirstSection} from '../../components/MainDashboardVendas/MainDashboardVendas.jsx'
import SalesChart from '../../components/SalesData/SalesData.jsx'
import { useState } from 'react';

const VendasDashboard = ()=>{

    const [dataInicial, setDataInicial] = useState('2024-02-03');
    const [dataFinal, setDataFinal] = useState('2025-02-03');
    
    return(
        <>
            <FirstSection
                dataInicial={dataInicial}
                dataFinal={dataFinal}
                setDataInicial={setDataInicial}
                setDataFinal={setDataFinal}
            />
            <GraphicsContent>


            <SalesChart startDate={dataInicial} endDate={dataFinal}/>
            <SalesDonutChart/>
            <ProductSalesChart/>
            <GroupSalesChart/>
            <SupplierSalesChart/>
            <BranchSalesDonutChart/>
            <SalesByCityChart/>
            <SalesByStateChart/>
            <SalesByCategoryChart/>
            <SalesByNeighborhoodChart/>
            <SalesByOriginChart/>
            <SalesByPaymentMethodChart/>
            </GraphicsContent>
        </>
        
    )
}

export default VendasDashboard