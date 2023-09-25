
import useRouteElements from './router';
import ConfigProviderAnt from './components/ConfigAntd';


function App() {
  const route = useRouteElements();
  return (<ConfigProviderAnt>{route}</ConfigProviderAnt>)
}

export default App
