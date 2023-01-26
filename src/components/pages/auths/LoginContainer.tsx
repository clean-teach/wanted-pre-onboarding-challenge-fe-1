import { useState } from 'react';
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

  // const { data, isLoading, mutate, mutateAsync } = useMutation(fetchLogIn);

  const handleSignIn = (data: ISignInForm) => {
    // mutate(
    //   {
    //     email: data.email,
    //     password: data.password,
    //   },
    //   {
    //     onSuccess: (data, variables, context) => {
    //       // window.localStorage.setItem(LOCALSTORAGE_LOGINTOKEN, data.data.token);
    //       // setIsLoggedIn(true);
    //     },
    //     onError: (error, variables, context) => {
    //       if (error) {
    //         console.log(error);
    //         // const status = error.response.status;
    //         // setFetchError({
    //         //   status: error.response.status,
    //         //   message: error.message,
    //         // });
    //       }
    //     },
    //   },
    // );

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
    <LoginPresentational
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      handleSignIn={handleSignIn}
      isDefault={isDefault}
      fetchError={fetchError}
      errors={errors}
    />
  );
}

export default LoginContainer;
