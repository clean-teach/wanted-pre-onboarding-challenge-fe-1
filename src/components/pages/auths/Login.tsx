import { useState } from 'react';
import { AuthArea } from '../../../styles/GlobalStyle';
import { useForm } from 'react-hook-form';
import { regExpEmail } from '../../../utils/regexp';
import { fetchLogIn } from '../../../api/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorState, isLoggedInState } from '../../../atoms/atoms';
import { Link } from 'react-router-dom';
import { LOCALSTORAGE_LOGINTOKEN } from '../../../utils/strings';
import { setClassNameByValid } from '../../../utils/function';
import { getValidSignInFrom } from '../../../hooks/auth/signIn';
import { ISignInForm } from '../../../types/authComponentTypes';

function Login() {
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const [isDefault, setIsDefault] = useState(true);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const [successEmail, successPassword, successInput] =
    getValidSignInFrom(watch);

  const handleSignIn = (data: ISignInForm) => {
    const response = fetchLogIn({
      email: data.email,
      password: data.password,
    });

    response
      .then((response) => {
        window.localStorage.setItem(
          LOCALSTORAGE_LOGINTOKEN,
          response.data.token,
        );
        setIsLoggedIn(true);
        setFetchError({
          status: null,
          message: '',
        });
      })
      .catch((error) => {
        console.log(error);
        setFetchError({
          status: error.response.status,
          message: error.response.data.details,
        });
      });
    setIsDefault(false);
  };

  return (
    <AuthArea>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input
          {...register('email', {
            required: '이메일에 @ 와 . 이 포함되어야 합니다.',
            pattern: regExpEmail,
          })}
          type="email"
          placeholder="이메일을 입력해주세요"
          className={setClassNameByValid({
            isDefault,
            successCondition: successEmail,
            warningCondition:
              watch().email?.length !== 0 || fetchError.status !== null,
          })}
        />
        {errors.email?.type === 'pattern' && (
          <p className="warning">{errors.email.message}</p>
        )}
        <input
          {...register('password', {
            required: '비밀번호는 최소 8자 이상을 입력하여야 합니다.',
            minLength: 8,
          })}
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className={setClassNameByValid({
            isDefault,
            successCondition: successPassword,
            warningCondition:
              watch().email?.length !== 0 || fetchError.status !== null,
          })}
        />
        {errors.password?.type === 'minLength' && (
          <p className="warning">{errors.password?.message}</p>
        )}
        <button disabled={successInput ? false : true}>제출</button>
        {fetchError.status !== null ? (
          <p className="warning">
            {fetchError.status} : {fetchError.message}
          </p>
        ) : null}
      </form>
      <hr />
      <Link to="../signup">아직 회원이 아니신가요?</Link>
    </AuthArea>
  );
}

export default Login;
