import React from 'react';
import styles from './SignUp.module.css';
import Button from '../../components/UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from '../../helper/Paths';
import { getUsers, setCurrentUser, setUsers } from '../../helper/storage.functions';
import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/interfaces';
import ErrorMessage from '../../components/UI/form-error-message/FormErrorMessage';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setReduxCurrentUser } from '../../store/current-user/currentUser';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { register, getValues, handleSubmit, clearErrors, formState: { errors } } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode:'onSubmit',
    criteriaMode:'all'
  });

  const emailErrors = [];
  const passwordErrors = [];
  const passwordConfirmErrors = [];
  for (const iterator in errors.email?.types) {
    if(iterator === 'required') emailErrors.push('Field required!');
    if(iterator === 'invalidEmail') emailErrors.push('Invalid email!');
  }
  for (const iterator in errors.password?.types) {
    if(iterator === 'required') passwordErrors.push('Field required!');
    if(iterator === 'minLength') passwordErrors.push('Password must be at least 8 characters long!');
    if(iterator === 'characterTypes') passwordErrors.push('Password must contain at least one capital letter and at least one number!');
  }
  for (const iterator in errors.passwordConfirm?.types) {
    if(iterator === 'required') passwordConfirmErrors.push('Field required!');
    if(iterator === 'matchingPassword') passwordConfirmErrors.push('Password are not matching!');
  }
  
  function registerUser(email: string, password: string) {
    const users = getUsers();
    users.push({ email, password });
    setUsers(users);
    setCurrentUser(email);
    dispatch(setReduxCurrentUser(email));
    navigate(PATHS.HOME);
  };

  function onSubmit(data: FormData) {
    const users = getUsers();
    const matchingEmail = users.find((user: User) => user.email === data.email);
    if (matchingEmail) return alert("Email already exists");
    registerUser(data.email, data.password);
  };

  return (
    <form className={styles['form-register']} onSubmit={handleSubmit(onSubmit)} onChange={() => clearErrors()}>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Email</label>
        <input {...register("email", {
          required:true,
          validate: {
            invalidEmail : (value) => /\S+@\S+\.\S+/.test(value),
          } 
        })} />
        {emailErrors.length > 0 && emailErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
      </div>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Password</label>
        <input {...register("password", {
          required: true,
          minLength: 8,
          validate: {
            characterTypes: (value) => /[A-Z]/.test(value) && /\d/.test(value),
          },
        })} />
        {passwordErrors.length > 0 && passwordErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
      </div>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Confirm Password</label>
        <input {...register("passwordConfirm", {
          required: true,
          validate: {
            matchingPassword: (value) => getValues().password === value
          }
        })} />
        {passwordConfirmErrors.length > 0 && passwordConfirmErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
      </div>
      <div className={styles['form-register__controls']}>
        <Button type='submit'>Sign Up</Button>
      </div>
      <div>
        Already have an account? Sign In <Link to='/login'>here</Link>
      </div>
    </form>);

};

export default SignUp;
