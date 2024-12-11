import { GraphicsContent } from './styled.js';
import { FirstSectionGraphic } from '../../components/GraphicsSection/GraphicsSection.jsx';
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

const VendasDashboard = ()=>{
    return(
        <>
            <FirstSection/>
            <GraphicsContent>


            <SalesChart/>
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