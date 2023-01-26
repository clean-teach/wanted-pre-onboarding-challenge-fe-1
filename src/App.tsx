import { Outlet } from 'react-router-dom';
import CheckLoged from './components/HOCs/CheckLoged';
import HeaderContainer from './components/layouts/HeaderContainer';

function App() {
  return (
    <>
      <HeaderContainer />
      <Outlet />
      <CheckLoged>
        <div>test</div>
      </CheckLoged>
    </>
  );
}

export default App;
