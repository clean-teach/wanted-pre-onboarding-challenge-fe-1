import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { OutletProps, useNavigate } from 'react-router-dom';
import { isLoggedInState } from '../../atoms/atoms';
import { LOCALSTORAGE_LOGINTOKEN } from '../../utils/strings';

function CheckLoged({ child }: any): React.ReactElement {
  console.log(child);
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN)
  //     ? setIsLoggedIn(true)
  //     : setIsLoggedIn(false);
  // }, []);
  // useEffect(() => {
  //   isLoggedIn ? navigate('/todos') : navigate('/auth/login');
  // }, [isLoggedIn]);

  return child;
}

export default CheckLoged;
