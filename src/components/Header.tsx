import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_LOGINTOKEN } from '../utils/strings';
import { useRecoilState } from 'recoil';
import { errorState, isLoggedInState } from '../atoms';

const Wrapper = styled.header`
  width: 100%;
  height: 4rem;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
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

const Btn = styled.div``;

function Header() {
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

  return (
    <Wrapper>
      <Title>원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제</Title>
      <nav>
        {isLoggedIn ? (
          <Btn as="button" onClick={onLogOut}>
            로그아웃
          </Btn>
        ) : (
          <Btn>
            <Link to="/auth/login">로그인</Link>
          </Btn>
        )}
      </nav>
    </Wrapper>
  );
}

export default Header;
