import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchLogIn } from '../../../api/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorState, isLoggedInState } from '../../../atoms/atoms';
import { LOCALSTORAGE_LOGINTOKEN } from '../../../utils/strings';
import { ISignInForm } from '../../../types/authComponentTypes';
import LoginPresentational from './LoginPresentational';
import { useMutation } from 'react-query';

function LoginContainer() {
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const [isDefault, setIsDefault] = useState(true);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const mutation = useMutation(fetchLogIn);

  const handleSignIn = (inputData: ISignInForm) => {
    mutation.mutate(
      {
        email: inputData.email,
        password: inputData.password,
      },
      {
        onSuccess: (response) => {
          const token = response.data.token;
          window.localStorage.setItem(LOCALSTORAGE_LOGINTOKEN, token);
          setIsLoggedIn(true);
          setFetchError({
            status: null,
            message: '',
          });
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
    <LoginPresentational
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
      isDefault={isDefault}
      fetchError={fetchError}
      errors={errors}
      mutation={mutation}
    />
  );
}

export default LoginContainer;
