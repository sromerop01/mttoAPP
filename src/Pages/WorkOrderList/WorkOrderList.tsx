import { useEffect } from "react"
import { initFlowbite } from "flowbite"

const WorkOrderList = () => {
  useEffect(() => {
      initFlowbite() 
    }, [])

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ordenes de Trabajo</h1>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Solicitud
                </th>
                <th scope="col" className="px-6 py-3">
                  Equipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Orde de trabajo Nro.
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Ejemplo
                </th>
                <td className="px-6 py-4">ejemplo</td>
                <td className="px-6 py-4">546</td>
                <td className="px-6 py-4">25-01-01</td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default WorkOrderList