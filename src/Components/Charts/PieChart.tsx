import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';


// Datos de ejemplo para diferentes periodos (simulados para un pie chart)
const MOCK_DATA = {
  "Last 7 days": { series: [60, 25], labels: ["Correctivos", "Preventivos"] },
  "Last 30 days": { series: [55, 30], labels: ["Correctivos", "Preventivos"] },
  "Last 90 days": { series: [50, 20], labels: ["Correctivos", "Preventivos"] },
  "Yesterday": { series: [70, 10], labels: ["Correctivos", "Preventivos"] },
  "Today": { series: [65, 22], labels: ["Correctivos", "Preventivos"] },
};

const PieChart = () => {

  const [currentDateRangeDisplay, setCurrentDateRangeDisplay] = useState("Last 7 days"); // Para el botón de "Last 7 days"
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // Estado para las series y opciones del gráfico
  const [chartSeries, setChartSeries] = useState<number[]>(MOCK_DATA["Last 7 days"].series);
  const [chartOptions, setChartOptions] = useState<ApexOptions>(() => {
    // Función para obtener las opciones iniciales del gráfico
    // Adaptado de tu getChartOptions()
    return {
      series: MOCK_DATA["Last 7 days"].series, // series se pasa como prop separado al componente Chart
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
        fontFamily: "Inter, sans-serif",
      },
      stroke: {
        colors: ["white"],
        // lineCap: "", // 'lineCap' debe ser 'butt' | 'square' | 'round'. Mejor omitir si no es necesario.
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%", // Apexcharts podría no usar 'size' aquí, ajusta si es necesario
          dataLabels: { // Formato de etiquetas de datos DENTRO del gráfico
            offset: -25,
          }
        },
      },
      labels: MOCK_DATA["Last 7 days"].labels, // Labels para las secciones del pie
      dataLabels: { // Habilitar y dar estilo a las etiquetas de datos
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
        formatter: function (val, opts) {
            // Muestra el porcentaje en la etiqueta de datos
            const seriesIndex = opts.seriesIndex;
            if (opts.w.globals.seriesTotals && opts.w.globals.seriesTotals.length > 0) {
                const percentage = (opts.w.globals.series[seriesIndex] / opts.w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0) * 100).toFixed(1);
                return percentage + "%";
            }
            return val + "%"; // Fallback si seriesTotals no está disponible
        }
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      // yaxis y xaxis no son típicamente usados para formatear labels en un pie chart simple.
      // Los formatters aquí podrían no tener efecto visible a menos que el tipo de gráfico cambie.
      // yaxis: {
      //   labels: {
      //     formatter: function (value) {
      //       return value + "%";
      //     },
      //   },
      // },
      // xaxis: {
      //   labels: {
      //     formatter: function (value) {
      //       return value + "%";
      //     },
      //   },
      //   axisTicks: { show: false },
      //   axisBorder: { show: false },
      // },
    };
  });

  const handlePeriodChange = (periodLabel: string, periodKey: keyof typeof MOCK_DATA) => {
    setCurrentDateRangeDisplay(periodLabel);
    const newData = MOCK_DATA[periodKey];
    if (newData) {
      setChartSeries(newData.series);
      setChartOptions(prevOptions => ({
        ...prevOptions,
        labels: newData.labels,
      }));
    }
  };
  
  // Manejador para el DateRangePicker (simulado, necesitaría integración con eventos del datepicker)
  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      const formattedStartDate = new Date(customStartDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      const formattedEndDate = new Date(customEndDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      setCurrentDateRangeDisplay(`${formattedStartDate} - ${formattedEndDate}`);
      
      // Simulación de actualización de datos para el rango personalizado
      const randomSeries = [Math.random() * 100, Math.random() * 100, Math.random() * 100];
      const total = randomSeries.reduce((a,b) => a+b, 0);
      setChartSeries(randomSeries.map(s => parseFloat((s/total*100).toFixed(1)) )); // Normalizar a porcentajes
      setChartOptions(prev => ({...prev, labels: ["Custom A", "Custom B", "Custom C"]}));
    }
  };
  
  // Efecto para aplicar cambios cuando customStartDate o customEndDate cambian (y ambos están definidos)
  useEffect(() => {
    if (customStartDate && customEndDate) {
      handleCustomDateChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customStartDate, customEndDate]);


  const dropdownDateItems = [
    { label: "Yesterday", periodKey: "Yesterday" as keyof typeof MOCK_DATA },
    { label: "Today", periodKey: "Today" as keyof typeof MOCK_DATA },
    { label: "Last 7 days", periodKey: "Last 7 days" as keyof typeof MOCK_DATA },
    { label: "Last 30 days", periodKey: "Last 30 days" as keyof typeof MOCK_DATA },
    { label: "Last 90 days", periodKey: "Last 90 days" as keyof typeof MOCK_DATA },
  ];

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center"> {/* Corregido: debe ser flex-col para que el botón esté debajo del título */}
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Mantenimientos</h5>
            <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
            <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                    <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                    <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
                    <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg></a>
                </div>
                <div data-popper-arrow></div>
            </div>
          </div>
          {/* Botón del Date Range Picker */}
          <button id="dateRangeButton" data-dropdown-toggle="dateRangeDropdown" data-dropdown-ignore-click-outside-class="datepicker" type="button" className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline text-sm"> {/* text-sm añadido */}
            {currentDateRangeDisplay} {/* Mostrará el rango seleccionado o "Last 7 days" etc. */}
            <svg className="w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="dateRangeDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600">
              <div className="p-3" aria-labelledby="dateRangeButton">
                <div date-rangepicker="true" datepicker-autohide="true" className="flex items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                            name="start" 
                            type="text" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Start date"
                            value={customStartDate}
                            onInput={(e) => setCustomStartDate((e.target as HTMLInputElement).value)} // o usar el evento onchange del datepicker de Flowbite
                         />
                    </div>
                    <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input 
                            name="end" 
                            type="text" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="End date"
                            value={customEndDate}
                            onInput={(e) => setCustomEndDate((e.target as HTMLInputElement).value)} // o usar el evento onchange del datepicker de Flowbite
                        />
                    </div>
                </div>
              </div>
          </div>
        </div>
        {/* Botón de opciones del widget */}
        <div className="flex justify-end items-center"> {/* Cambiado para asegurar que el botón está a la derecha */}
          <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" type="button"  className="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
            <svg className="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
            <span className="sr-only">Open dropdown</span>
          </button>
          <div id="widgetDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
                {/* ... (items del dropdown del widget) ... */}
                <li><a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/></svg>Edit widget</a></li>
                {/* ... más items ... */}
              </ul>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="py-6" id="pie-chart-container">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          width="100%"
          height={chartOptions.chart?.height || 420} // Usa la altura de las opciones o un default
        />
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButtonChartFooter" // ID diferente para este dropdown si es independiente
            data-dropdown-toggle="lastDaysDropdownChartFooter" // data-dropdown-toggle diferente
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button">
            {currentDateRangeDisplay} {/* Aquí se muestra el período seleccionado */}
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="lastDaysDropdownChartFooter" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButtonChartFooter">
                {dropdownDateItems.map((item) => (
                  <li key={item.periodKey}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePeriodChange(item.label, item.periodKey);
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
            Traffic analysis
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default PieChart;