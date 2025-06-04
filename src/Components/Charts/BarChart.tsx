import { useState} from 'react';
import Chart from 'react-apexcharts'; // Wrapper de React para ApexCharts
import type { ApexOptions } from 'apexcharts'; // Tipos para las opciones del gráfico
// import { initFlowbite } from 'flowbite'; // Asegúrate que Flowbite se inicializa en tu app

// Datos de ejemplo para diferentes periodos (simulados para un bar chart)
const MOCK_BAR_DATA = {
  "Last 6 months": {
    series: [
      { name: "Costos Diagnosticos", data: [1420, 1620, 1820, 1420, 1650, 2120].map(String) }, // ApexCharts espera números o strings que puedan ser parseados
      { name: "Costos Mantenimientos", data: [788, 810, 866, 788, 1100, 1200].map(String) }
    ],
    categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  "Last 7 days": { // Ejemplo de otros datos
    series: [
      { name: "Costos Diagnosticos", data: [100, 120, 110, 130, 90, 140, 105].map(String) },
      { name: "Costos Mantenimientos", data: [50, 60, 55, 65, 40, 70, 45].map(String) }
    ],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  // Añade más datos para otros periodos si es necesario
};


const BarChart = () => {
  // useEffect(() => {
  //   // initFlowbite(); // Si no se inicializa globalmente
  // }, []);

  const [selectedPeriod, setSelectedPeriod] = useState<string>("Last 6 months");

  const initialChartData = MOCK_BAR_DATA["Last 6 months"];

  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>(
    initialChartData.series.map(s => ({ ...s, color: s.name === "Costos Diagnosticos" ? "#31C48D" : "#F05252" }))
  );

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    series: initialChartData.series.map(s => ({ ...s, color: s.name === "Costos Diagnosticos" ? "#31C48D" : "#F05252" })), // series se pasa como prop separado al componente Chart
    chart: {
      sparkline: { enabled: false },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif", // Añadido para consistencia
    },
    fill: { opacity: 1 },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%", // Puede ser un porcentaje o 'flex'
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: { position: "top" },
      },
    },
    legend: { show: true, position: "bottom", fontFamily: "Inter, sans-serif" },
    dataLabels: { enabled: false }, // Estaba false, si quieres labels en las barras, ponlo true y configúralo
    tooltip: {
      shared: true,
      intersect: false,
      style: { fontFamily: "Inter, sans-serif" }, // Añadido para consistencia
      y: { // Mantenido el formatter del tooltip para y
        formatter: function (value) {
          return "$" + value;
        }
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function(value) {
          return "$" + value; // Este formatter es para los labels del eje X
        }
      },
      categories: initialChartData.categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: -20 },
    },
    // colors: ["#31C48D", "#F05252"], // Los colores se pueden definir en cada serie
  });

  const handlePeriodChange = (periodLabel: string, periodKey: keyof typeof MOCK_BAR_DATA) => {
    setSelectedPeriod(periodLabel);
    const newData = MOCK_BAR_DATA[periodKey];
    if (newData) {
      setChartSeries(
        newData.series.map(s => ({ ...s, color: s.name === "Costos Diagnosticos" ? "#31C48D" : "#F05252" }))
      );
      setChartOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: newData.categories,
        }
      }));
    }
  };

  const dropdownPeriodItems = [
    { label: "Yesterday", periodKey: "Yesterday" as keyof typeof MOCK_BAR_DATA }, // Usando Last 7 days como fallback
    { label: "Today", periodKey: "Today" as keyof typeof MOCK_BAR_DATA }, // Usando Last 7 days como fallback
    { label: "Last 7 days", periodKey: "Last 7 days" as keyof typeof MOCK_BAR_DATA },
    { label: "Last 30 days", periodKey: "Last 30 days" as keyof typeof MOCK_BAR_DATA }, // Simulación, ajusta los datos
    { label: "Last 90 days", periodKey: "Last 90 days" as keyof typeof MOCK_BAR_DATA },// Simulación
    { label: "Last 6 months", periodKey: "Last 6 months" as keyof typeof MOCK_BAR_DATA },
    { label: "Last year", periodKey: "Last year" as keyof typeof MOCK_BAR_DATA },// Simulación
  ];


  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">$5,405</dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
            Profit rate 23.5%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Costos Diagnosticos</dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">$23,635</dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Costos Mantenimientos</dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">-$18,230</dd>
        </dl>
      </div>

      <div id="bar-chart-container" className="py-6"> {/* Contenedor para el gráfico */}
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={400} // Puedes usar "400px" o el número
          width="100%"
        />
      </div>
      
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton" // ID único si tienes múltiples dropdowns en la página
            data-dropdown-toggle="lastDaysdropdownRevenue" // Asegúrate que el ID del dropdown coincida
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button">
            {selectedPeriod}
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="lastDaysdropdownRevenue" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {dropdownPeriodItems.map(item => (
                  <li key={item.periodKey}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePeriodChange(item.label, item.periodKey);
                        // Opcional: cerrar el dropdown de Flowbite si no se cierra solo
                        // const dropdownElement = document.getElementById('lastDaysdropdownRevenue');
                        // if (dropdownElement) {
                        //   const dropdownInstance = FlowbiteInstances.getInstance('Dropdown', 'lastDaysdropdownRevenue');
                        //   if (dropdownInstance) dropdownInstance.hide();
                        // }
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
          </div>
          {/* <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
            Revenue Report
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default BarChart;