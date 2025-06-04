import { Navigate, useRoutes } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'

//Page
import Dashboard from '../Pages/Dashboard/Dashboard'
import WorkOrder from '../Pages/WorkOrder/WorkOrder'
import WorkOrderList from '../Pages/WorkOrderList/WorkOrderList'
  
const Approutes = () => {
    return(
        useRoutes([
            {
                element: <Layout />, // El componente Layout envuelve a las rutas hijas
                children: [
                    {
                        index: true, // Esto marca la ruta por defecto dentro del Layout
                        element: <Navigate to="/dashboard" replace />
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "work-order",
                        element: <WorkOrder />
                    },
                    {
                        path: "work-order-list",
                        element: <WorkOrderList />
                    },
                ]
             }]
        )
    )
}

export default Approutes