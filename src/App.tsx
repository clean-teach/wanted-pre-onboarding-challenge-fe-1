import { Outlet } from 'react-router-dom';
import HeaderContainer from './components/layouts/HeaderContainer';
import CheckLoged from './hooks/auth/CheckLoged';

function App() {
  CheckLoged();

  return (
    <>
      <HeaderContainer />
      <Outlet />
    </>
  );
}

export default App;
