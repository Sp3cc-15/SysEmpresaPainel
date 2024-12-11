import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/LoginPage/Login.jsx'
import Clientes from './routes/clientesDashboard/ClientesDashboard.jsx'
import VendasDashboard from './routes/VendasDashboard/VendasDashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "vendas", element: <VendasDashboard /> },
      { path: "clientes", element: <Clientes /> },
    ],
  },
  { path: "/login", element: <Login /> }
]);



createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
  ,
)
