import { AuthArea } from '../../../styles/GlobalStyle';
import { regExpEmail } from '../../../utils/regexp';
import { Link } from 'react-router-dom';
import { setClassNameByValid } from '../../../utils/function';
import { getValidSignInFrom } from '../../../hooks/auth/signIn';
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { ISignInForm } from '../../../types/authComponentTypes';
import { IErrorState } from '../../../types/atomsTypes';
import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { IPropsAuths } from '../../../types/apiPropsTypes';

interface IProps {
  register: UseFormRegister<ISignInForm>;
  watch: UseFormWatch<ISignInForm>;
  handleSubmit: UseFormHandleSubmit<ISignInForm>;
  handleSignIn: (data: ISignInForm) => void;
  isDefault: boolean;
  fetchError: IErrorState;
  errors: Partial<
    FieldErrorsImpl<{
      email: string;
      password: string;
    }>
  >;
  mutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    IPropsAuths,
    unknown
  >;
}

function LoginPresentational({
  register,
  watch,
  handleSubmit,
  handleSignIn,
  isDefault,
  fetchError,
  errors,
  mutation,
}: IProps) {
  const [successEmail, successPassword, successInput] =
    getValidSignInFrom(watch);

  return (
    <AuthArea>
      <h2>로그인</h2>
      {mutation.isLoading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="input-area">
              <input
                id="userEmail"
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
              <label htmlFor="userEmail">E-mail</label>
              {errors.email?.type === 'pattern' && (
                <p className="warning">{errors.email.message}</p>
              )}
            </div>
            <div className="input-area">
              <input
                id="userPassword"
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
              <label htmlFor="userPassword">Password</label>
              {errors.password?.type === 'minLength' && (
                <p className="warning">{errors.password?.message}</p>
              )}
            </div>
            <button disabled={successInput ? false : true}>제출</button>
            {fetchError.status !== null ? (
              <p className="warning">
                {fetchError.status} : {fetchError.message}
              </p>
            ) : null}
          </form>
          <hr />
          <Link to="../signup">아직 회원이 아니신가요?</Link>
        </>
      )}
    </AuthArea>
  );
}

export default LoginPresentational;
