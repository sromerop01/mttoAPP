import { useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { initFlowbite } from 'flowbite';
import Approutes from '../../Routes/Approutes';


function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <BrowserRouter>
      <Approutes/>
    </BrowserRouter>
  );
}

export default App;