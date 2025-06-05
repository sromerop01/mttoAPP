import { useState } from 'react';
import Chart from 'react-apexcharts'; // Wrapper de React para ApexCharts
import type { ApexOptions } from 'apexcharts'; // Tipos para las opciones del gráfico

// Datos de ejemplo para diferentes periodos
const L7_DAYS_DATA = {
  Correctivo: [ { x: "Mon", y: 231 }, { x: "Tue", y: 122 }, { x: "Wed", y: 63 }, { x: "Thu", y: 421 }, { x: "Fri", y: 122 }, { x: "Sat", y: 323 }, { x: "Sun", y: 111 } ],
  Preventivo: [ { x: "Mon", y: 232 }, { x: "Tue", y: 113 }, { x: "Wed", y: 341 }, { x: "Thu", y: 224 }, { x: "Fri", y: 522 }, { x: "Sat", y: 411 }, { x: "Sun", y: 243 } ],
};
const L30_DAYS_DATA = {
  Correctivo: [ { x: "W1", y: 300 }, { x: "W2", y: 450 }, { x: "W3", y: 280 }, { x: "W4", y: 500 } ], // Datos semanales para 30 días
  Preventivo: [ { x: "W1", y: 320 }, { x: "W2", y: 400 }, { x: "W3", y: 310 }, { x: "W4", y: 480 } ],
  categories: ["Week 1", "Week 2", "Week 3", "Week 4"]
};
const L90_DAYS_DATA = {
    Correctivo: [ { x: "M1", y: 1200 }, { x: "M2", y: 1500 }, { x: "M3", y: 1350 } ], // Datos mensuales para 90 días
    Preventivo: [ { x: "M1", y: 1100 }, { x: "M2", y: 1600 }, { x: "M3", y: 1400 } ],
    categories: ["Month 1", "Month 2", "Month 3"]
};


const ColumnChart= () => {

  const [selectedPeriod, setSelectedPeriod] = useState<string>("Last 7 days");
  
  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([
    { name: "Correctivo", data: L7_DAYS_DATA.Correctivo, color: "#1A56DB" },
    { name: "Preventivo", data: L7_DAYS_DATA.Preventivo, color: "#FDBA8C" },
  ]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    colors: ["#1A56DB", "#FDBA8C"],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: { fontFamily: "Inter, sans-serif" },
    },
    states: {
      hover: { filter: { type: "darken"} },
    },
    stroke: { show: true, width: 0, colors: ["transparent"] },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: -14 },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: L7_DAYS_DATA.Correctivo.map(d => d.x), // Categorías iniciales
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    fill: { opacity: 1 },
  });

  const updateChartData = (period: string) => {
    setSelectedPeriod(period);
    let newCorrectivoData: {x: string, y: number}[] = [];
    let newPreventivoData: {x: string, y: number}[] = [];
    let newCategories: string[] | undefined = undefined;

    switch (period) {
      case "Last 30 days":
        newCorrectivoData = L30_DAYS_DATA.Correctivo;
        newPreventivoData = L30_DAYS_DATA.Preventivo;
        newCategories = L30_DAYS_DATA.categories;
        break;
      case "Last 90 days":
        newCorrectivoData = L90_DAYS_DATA.Correctivo;
        newPreventivoData = L90_DAYS_DATA.Preventivo;
        newCategories = L90_DAYS_DATA.categories;
        break;
      case "Yesterday": // Simulación de datos para "Yesterday"
        newCorrectivoData = [{ x: "Yesterday", y: Math.floor(Math.random() * 500) }];
        newPreventivoData = [{ x: "Yesterday", y: Math.floor(Math.random() * 500) }];
        newCategories = ["Yesterday"];
        break;
      case "Today": // Simulación de datos para "Today"
        newCorrectivoData = [{ x: "Today", y: Math.floor(Math.random() * 500) }];
        newPreventivoData = [{ x: "Today", y: Math.floor(Math.random() * 500) }];
        newCategories = ["Today"];
        break;
      case "Last 7 days":
      default:
        newCorrectivoData = L7_DAYS_DATA.Correctivo;
        newPreventivoData = L7_DAYS_DATA.Preventivo;
        newCategories = L7_DAYS_DATA.Correctivo.map(d => d.x);
        break;
    }

    setChartSeries([
      { name: "Correctivo", data: newCorrectivoData, color: "#1A56DB" },
      { name: "Preventivo", data: newPreventivoData, color: "#FDBA8C" },
    ]);
    
    if (newCategories) {
        setChartOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories: newCategories,
            }
        }));
    }
  };

  const dropdownItems = [
    { label: "Yesterday", period: "Yesterday" },
    { label: "Today", period: "Today" },
    { label: "Last 7 days", period: "Last 7 days" },
    { label: "Last 30 days", period: "Last 30 days" },
    { label: "Last 90 days", period: "Last 90 days" },
  ];

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
            </svg>
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">34</h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Mantenimientos realizados</p>
          </div>
        </div>
        {/* <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
            42.5%
          </span>
        </div> */}
      </div>

      <div className="grid grid-cols-2">
        <dl className="flex items-center justify-center">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Correctivos:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">10</dd>
        </dl>
        <dl className="flex items-center justify-center">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Preventivos:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">24</dd>
        </dl>
      </div>

      {/* El componente Chart reemplaza a <div id="column-chart"></div> */}
      <div id="column-chart-container" className="py-6"> {/* Contenedor para el gráfico */}
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={320} // puedes usar "320px" o el número 320
          width="100%"
        />
      </div>
      
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown" // Flowbite JS usa esto para el toggle
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            {selectedPeriod}
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {dropdownItems.map(item => (
                  <li key={item.period}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        updateChartData(item.period);
                        // Si el dropdown de Flowbite no se cierra automáticamente, podrías necesitar ocultarlo manualmente aquí
                        // const dropdown = document.getElementById('lastDaysdropdown');
                        // if (dropdown) new Dropdown(dropdown, e.currentTarget).hide(); // O la API de Flowbite para ocultar
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
            Leads Report
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ColumnChart;