import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isLoggedInState } from './atoms/atoms';
import { LOCALSTORAGE_LOGINTOKEN } from './utils/strings';
import HeaderContainer from './components/layouts/HeaderContainer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN)
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, []);
  useEffect(() => {
    isLoggedIn ? navigate('/todos') : navigate('/auth/login');
  }, [isLoggedIn]);

  return (
    <>
      <HeaderContainer />
      <Outlet />
    </>
  );
}

export default App;
