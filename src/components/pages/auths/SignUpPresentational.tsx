import { AuthArea } from '../../../styles/GlobalStyle';
import { regExpEmail } from '../../../utils/regexp';
import { setClassNameByValid } from '../../../utils/function';
import { getValidSignUpFrom } from '../../../hooks/auth/signUp';
import { ISignUpForm } from '../../../types/authComponentTypes';
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { IErrorState } from '../../../types/atomsTypes';

interface IProps {
  register: UseFormRegister<ISignUpForm>;
  watch: UseFormWatch<ISignUpForm>;
  handleSubmit: UseFormHandleSubmit<ISignUpForm>;
  handleSignUp: (data: ISignUpForm) => void;
  isDefault: boolean;
  fetchError: IErrorState;
  errors: Partial<
    FieldErrorsImpl<{
      email: string;
      password: string;
      passwordConfirm: string;
    }>
  >;
}

function SignUpPresentational({
  register,
  handleSubmit,
  watch,
  handleSignUp,
  isDefault,
  fetchError,
  errors,
}: IProps) {
  const [successEmail, successPassword, successPasswordConfirm, successInput] =
    getValidSignUpFrom(watch);

  return (
    <AuthArea>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
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
            placeholder="비밀번호는 8자 이상을 입력해주세요"
            className={setClassNameByValid({
              isDefault,
              successCondition: successPassword,
              warningCondition:
                watch().password?.length !== 0 || fetchError.status !== null,
            })}
          />
          <label htmlFor="userPassword">Password</label>
          {errors.password?.type === 'minLength' && (
            <p className="warning">{errors.password?.message}</p>
          )}
        </div>
        <input
          {...register('passwordConfirm', {
            required:
              '입력하신 비밀번호와 동일하게 비밀번호 확인을 입력해 주세요',
            minLength: 8,
          })}
          type="password"
          placeholder="비밀번호 확인"
          className={setClassNameByValid({
            isDefault,
            successCondition: successPasswordConfirm,
            warningCondition:
              watch().passwordConfirm?.length !== 0 ||
              fetchError.status !== null,
          })}
        />
        {errors.passwordConfirm?.type === 'minLength' && (
          <p className="warning">{errors.passwordConfirm?.message}</p>
        )}
        <button disabled={successInput ? false : true}>제출</button>
        {!successEmail && (
          <p className="warning">
            이메일 형식을 확인해 주세요. 이메일은 @와 .을 포함하여야 합니다.
          </p>
        )}
        {!successPassword && (
          <p className="warning">비밀번호는 8자리 이상이어야 합니다.</p>
        )}
        {!successPasswordConfirm && (
          <p className="warning">입력하신 비밀번호와 동일하여야 합니다.</p>
        )}
        {fetchError.status !== null ? (
          <p className="warning">
            {fetchError.status} : {fetchError.message}
          </p>
        ) : null}
      </form>
    </AuthArea>
  );
}

export default SignUpPresentational;
