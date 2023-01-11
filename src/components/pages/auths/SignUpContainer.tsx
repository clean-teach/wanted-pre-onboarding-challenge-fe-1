import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchSignUp } from '../../../api/api';
import { useRecoilState } from 'recoil';
import { errorState } from '../../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { ISignUpForm } from '../../../types/authComponentTypes';
import SignUpPresentational from './SignUpPresentational';

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

  const handleSignUp = (data: ISignUpForm) => {
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
    setIsDefault(false);
  };

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
