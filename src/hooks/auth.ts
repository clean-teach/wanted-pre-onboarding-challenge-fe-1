import { UseFormWatch } from 'react-hook-form';
import { ISignInForm, ISignUpForm } from '../types/authComponentTypes';
import { regExpEmail } from '../utils/regexp';

export const getValidSignUpFrom = (watch: UseFormWatch<ISignUpForm>) => {
  const successEmail = regExpEmail.test(watch().email);
  const successPassword = watch().password?.length >= 8;
  const successPasswordConfirm =
    watch().passwordConfirm?.length >= 8 &&
    watch().password === watch().passwordConfirm;
  const successInput =
    successEmail && successPassword && successPasswordConfirm;

  return [successEmail, successPassword, successPasswordConfirm, successInput];
};
export const getValidSignInFrom = (watch: UseFormWatch<ISignInForm>) => {
  const successEmail = regExpEmail.test(watch().email);
  const successPassword = watch().password?.length >= 8;
  const successInput = successEmail && successPassword;

  return [successEmail, successPassword, successInput];
};
