import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import ColumnChart from "../../Components/Charts/ColumnChart";
import PieChart from "../../Components/Charts/PieChart";
import BarChart from "../../Components/Charts/BarChart";

const Dashboard = () => {
  useEffect(() => {
      initFlowbite(); 
    }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard</h1>
      {/* Contenido específico del Dashboard */}
      <div className="grid gap-2 md:grid-cols-2 sm:grid-cols-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <ColumnChart/>
        <PieChart/>
        <BarChart/>
      </div>
    </div>
  );
};

export default Dashboard