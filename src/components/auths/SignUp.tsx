import { AuthArea } from '../../styles/GlobalStyle';
import { useForm } from 'react-hook-form';
import { regExpEmail } from '../../utils/regexp';
import { fetchSignUp } from '../../api';
import { useRecoilState } from 'recoil';
import { errorState } from '../../atoms';
import { useNavigate } from 'react-router-dom';

interface IForm {
  email: string;
  password: string;
  password2: string;
}

function SignUp() {
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
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
    console.log(response);
  };

  const successEmail = regExpEmail.test(watch().email);
  const successPassword = watch().password?.length >= 8;
  const successPassword2 =
    watch().password2?.length >= 8 && watch().password === watch().password2;
  const successInput = successEmail && successPassword && successPassword2;

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
          className={
            successEmail
              ? 'success'
              : watch().email?.length !== 0
              ? 'warning'
              : ''
          }
        />
        {errors.email?.type === 'pattern' && <p>{errors.email.message}</p>}
        <input
          {...register('password', {
            required: '비밀번호는 최소 8자 이상을 입력하여야 합니다.',
            minLength: 8,
          })}
          type="password"
          placeholder="비밀번호는 8자 이상을 입력해주세요"
          className={
            successPassword
              ? 'success'
              : watch().password?.length !== 0
              ? 'warning'
              : ''
          }
        />
        {errors.password?.type === 'minLength' && <p></p>}
        <input
          {...register('password2', {
            required:
              '입력하신 비밀번호와 동일하게 비밀번호 확인을 입력해 주세요',
            minLength: 8,
          })}
          type="password"
          placeholder="비밀번호 확인"
          className={
            successPassword2
              ? 'success'
              : watch().password2?.length !== 0
              ? 'warning'
              : ''
          }
        />
        <button disabled={successInput ? false : true}>제출</button>
        {fetchError.status !== null ? (
          <p>
            {fetchError.status} : {fetchError.message}
          </p>
        ) : null}
      </form>
    </AuthArea>
  );
}

export default SignUp;
