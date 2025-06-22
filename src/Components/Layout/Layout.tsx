import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {

  return (
    <div className="flex flex-col min-h-screen"> {/* Usa min-h-screen para asegurar que al menos ocupe toda la pantalla */}
      <Navbar/>
      <div className='flex flex-1 pt-16'> {/* `pt-16` si navbar es `h-16`. `flex-1` para ocupar espacio restante */}
        <Sidebar/>
        <main className={`flex-1 p-4 sm:ml-64 bg-gray-100 dark:bg-gray-900`}>
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default Layout