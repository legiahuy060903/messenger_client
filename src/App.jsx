
import useRouteElements from './router';
import ConfigProviderAnt from './components/ConfigAntd';
import { useDispatch, useSelector } from 'react-redux';

import SocketClient, { socket, peer } from './services/socketClient';
import ModalCall from './components/ModalCall';



function App() {

  const { user, call: { info } } = useSelector(s => s);


  const route = useRouteElements();
  return (
    <ConfigProviderAnt>

      {user?.isAuthenticated === true && <SocketClient />}
      {route}
      {info && <ModalCall />}
    </ConfigProviderAnt>
  )
}

export default App
