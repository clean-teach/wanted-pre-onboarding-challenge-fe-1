import { useState } from 'react';
import { AuthArea } from '../../../styles/GlobalStyle';
import { useForm } from 'react-hook-form';
import { regExpEmail } from '../../../utils/regexp';
import { fetchSignUp } from '../../../api/api';
import { useRecoilState } from 'recoil';
import { errorState } from '../../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { setClassNameByValid } from '../../../utils/function';

interface IForm {
  email: string;
  password: string;
  password2: string;
}

function SignUp() {
  const [isDefault, setIsDefault] = useState(true);
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const successEmail = regExpEmail.test(watch().email);
  const successPassword = watch().password?.length >= 8;
  const successPassword2 =
    watch().password2?.length >= 8 && watch().password === watch().password2;
  const successInput = successEmail && successPassword && successPassword2;

  const onValid = (data: IForm) => {
    setIsDefault(false);
    const response = fetchSignUp({
      email: data.email,
      password: data.password,
    });
    response
      .then((response) => {
        if (response.status === 200) {
          setFetchError({
            status: null,
            message: '',
          });
          alert('회원가입이 완료되었습니다.');
          navigate('../login');
        }
      })
      .catch((error) => {
        console.log(error);
        setFetchError({
          status: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  return (
    <AuthArea>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onValid)}>
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
          placeholder="비밀번호는 8자 이상을 입력해주세요"
          className={setClassNameByValid({
            isDefault,
            successCondition: successPassword,
            warningCondition:
              watch().password?.length !== 0 || fetchError.status !== null,
          })}
        />
        {errors.password?.type === 'minLength' && (
          <p className="warning">{errors.password?.message}</p>
        )}
        <input
          {...register('password2', {
            required:
              '입력하신 비밀번호와 동일하게 비밀번호 확인을 입력해 주세요',
            minLength: 8,
          })}
          type="password"
          placeholder="비밀번호 확인"
          className={setClassNameByValid({
            isDefault,
            successCondition: successPassword2,
            warningCondition:
              watch().password2?.length !== 0 || fetchError.status !== null,
          })}
        />
        {errors.password2?.type === 'minLength' && (
          <p className="warning">{errors.password2?.message}</p>
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
        {!successPassword2 && (
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

export default SignUp;
