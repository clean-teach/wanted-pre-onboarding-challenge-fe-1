// import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_LOGINTOKEN } from '../../utils/strings';
import { useRecoilState } from 'recoil';
import { errorState, isLoggedInState } from '../../atoms/atoms';
import HeaderPresentational from './HeaderPresentational';

function HeaderContainer() {
  const currentLocation = useLocation();
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const onLogOut = () => {
    window.localStorage.removeItem(LOCALSTORAGE_LOGINTOKEN);
    setIsLoggedIn(false);
    navigate('/auth/login');
    setFetchError({
      status: null,
      message: '',
    });
  };

  // useEffect(() => {
  //   console.log(currentLocation);
  // }, [currentLocation]);

  return (
    <HeaderPresentational
      currentLocation={currentLocation}
      isLoggedIn={isLoggedIn}
      onLogOut={onLogOut}
    />
  );
}

export default HeaderContainer;
