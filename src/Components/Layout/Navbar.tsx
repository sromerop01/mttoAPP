import logoUNAL from '../../assets/Unal logosimbolo.png'

const Navbar = () => {
  return (
    <nav className={`bg-white border-b border-gray-500 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50 w-full h-16`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative"> {/* Añadido relative para posicionar botón mobile */}
        {/* Botón para mostrar sidebar en móviles (opcionalmente movido aquí) */}
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoUNAL} className="h-8" alt="mttoAPI Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">mttoAPP</span>
        </a>
        {/* ... (resto de los links del navbar: Home, About, etc.) ... */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default"> {/* Asegúrate que este ID sea único si tienes otro navbar-default */}
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* <li><a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a></li> */}
            {/* <li><a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a></li> */}
            {/* ... más links ... */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;