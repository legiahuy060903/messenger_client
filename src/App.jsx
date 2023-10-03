
import useRouteElements from './router';
import ConfigProviderAnt from './components/ConfigAntd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SocketClient, { socket } from './services/socketClient';

function App() {

  const dispatch = useDispatch();
  const { account, isAuthenticated } = useSelector(s => s.user)

  const route = useRouteElements();
  return (
    <ConfigProviderAnt>
      {isAuthenticated === true && <SocketClient />}
      {route}
    </ConfigProviderAnt>
  )
}

export default App
