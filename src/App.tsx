import { Outlet } from 'react-router-dom';
import HeaderContainer from './components/layouts/HeaderContainer';

function App() {
  return (
    <>
      <HeaderContainer />
      <Outlet />
    </>
  );
}

export default App;
