import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignUp } from '../../../api/api';
import { useRecoilState } from 'recoil';
import { errorState } from '../../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { ISignUpForm } from '../../../types/authComponentTypes';
import SignUpPresentational from './SignUpPresentational';
import { useMutation } from 'react-query';

function SignUpContainer() {
  const [isDefault, setIsDefault] = useState(true);
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const mutation = useMutation(fetchSignUp);

  const handleSignUp = (data: ISignUpForm) => {
    mutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(data) {
          if (data.status === 200) {
            setFetchError({
              status: null,
              message: '',
            });
            alert('회원가입이 완료되었습니다.');
            navigate('../login');
          }
        },
        onError: (error: any) => {
          console.log('error', error);
          setFetchError({
            status: error.response.status,
            message: error.response.data.details,
          });
        },
      },
    );
    setIsDefault(false);
  };

  useEffect(() => {
    return () => {
      setFetchError({
        status: null,
        message: '',
      });
    };
  }, []);

  return (
    <SignUpPresentational
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      handleSignUp={handleSignUp}
      isDefault={isDefault}
      fetchError={fetchError}
      errors={errors}
    />
  );
}

export default SignUpContainer;
