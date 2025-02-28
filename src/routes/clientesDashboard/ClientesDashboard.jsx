import { FirstSectionClientes } from "../../components/MainDashboardClientes/MainDashBoardClientes"
import { GraphicsContent } from "./styled.js";
import CustomerChart from "../../components/clientsCompontens/MensalEvolution/MensalEvolution.jsx"
import ClientsByCityChart from "../../components/clientsCompontens/ClientsByCity/ClientsByCity.jsx"
import ClientsByStateChart from "../../components/clientsCompontens/ClientsByState/ClientsByState.jsx"
import ClientsByCategoryChart from "../../components/clientsCompontens/ClientsByCategory/ClientsByCategory.jsx"
import ClientsByNeighborhoodChart from "../../components/clientsCompontens/ClientsByNeighborhood/ClientsByNeighborhood.jsx"
import FinanceChart from "../../components/clientsCompontens/Teste/Teste.jsx"

const ClientsDashboard = ()=>{

    return(
        <>
            <FirstSectionClientes/>
            <GraphicsContent>


                <CustomerChart/>
                <ClientsByCityChart/>
                <ClientsByStateChart/>
                <ClientsByCategoryChart/>
                <ClientsByNeighborhoodChart/>
                {/* <FinanceChart/> */}


            </GraphicsContent>
        </>
    )
}

export default ClientsDashboard