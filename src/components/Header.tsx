// import { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_LOGINTOKEN } from '../utils/strings';
import { useRecoilState } from 'recoil';
import { errorState, isLoggedInState } from '../atoms';

const Wrapper = styled.header`
  width: 100%;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  nav {
    position: absolute;
    right: 2rem;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Btn = styled.div`
  padding: 0.5rem;
`;

function Header() {
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
    <Wrapper>
      <Title>원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제 : 김청훈</Title>
      <nav>
        {isLoggedIn ? (
          <Btn as="button" onClick={onLogOut}>
            로그아웃
          </Btn>
        ) : (
          <Btn>
            {currentLocation.pathname !== '/auth/login' && (
              <Link to="/auth/login">로그인</Link>
            )}
          </Btn>
        )}
      </nav>
    </Wrapper>
  );
}

export default Header;