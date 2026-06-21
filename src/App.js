import stateStored from './arquivo/store';
import Selector from './componentes/Selector';
import SelectorMemorization from './componentes/SelectorMemorization';

function App() {

  return (
    <div className="App">
        
        <Selector colaboradores={stateStored.colaboradores} />
        <SelectorMemorization state={stateStored} />
        
    </div>
  );
}

export default App;
