import { UseFormWatch } from 'react-hook-form';
import { ISignInForm } from '../../types/authComponentTypes';
import { regExpEmail } from '../../utils/regexp';

export const getValidSignInFrom = (watch: UseFormWatch<ISignInForm>) => {
  const successEmail = regExpEmail.test(watch().email);
  const successPassword = watch().password?.length >= 8;
  const successInput = successEmail && successPassword;

  return [successEmail, successPassword, successInput];
};
