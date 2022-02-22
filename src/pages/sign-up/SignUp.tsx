import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';
import Button from '../../components/UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { validateInputs } from './SignUp.validator';
import { PATHS } from '../../helper/Paths';
import { getUsers, setCurrentUser, setUsers } from '../../helper/storage.functions';
import { errorDefault } from './SignUp.constans';
var cloneDeep = require('lodash.clonedeep');

function SignUp(): JSX.Element {
  // TODO: find out what is 'add missing function declaration quick fix';
  const [errors, setErrors] = useState({ ...cloneDeep(errorDefault) });
  const { emailRef, passwordRef, passwordConfirmRef, registerUser } = useSignUp();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (emailRef === null || passwordRef === null || emailRef.current === null || passwordRef.current === null || passwordConfirmRef === null || passwordConfirmRef.current === null) {
      alert("Some error with useRef references");
      return;
    }
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    const testObject = cloneDeep(errorDefault);
    validateInputs({ email, password, passwordConfirm }, testObject);
    if (testObject.isError) {
      setErrors({ ...testObject });
      return;
    }
    registerUser(email, password);
  };

  function handleFocus(event: React.FocusEvent<HTMLFormElement>) {
    if (event.target.tagName === 'INPUT' && errors.isError) {
      setErrors({ ...cloneDeep(errorDefault) });
    }
  };

  return (
    <form className={styles['form-register']} onSubmit={handleSubmit} onFocus={handleFocus}>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Email</label>
        <input ref={emailRef} type="email" name="email" required placeholder="example@example.com" />
        {errors.email.isError && errors.email.errors.map((message: string, index: number) => <ErrorMessage key={index} message={message} />)}
      </div>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" name="password" required placeholder="Password..." />
        {errors.password.isError && errors.password.errors.map((message: string, index: number) => <ErrorMessage key={index} message={message} />)}
      </div>
      <div className={styles['form-register__input']}>
        <label htmlFor="">Confirm Password</label>
        <input ref={passwordConfirmRef} type="password" name="password-change" required placeholder="Confirm Password..." />
        {errors.passwordConfirm.isError && errors.passwordConfirm.errors.map((message: string, index: number) => <ErrorMessage key={index} message={message} />)}
      </div>
      <div className={styles['form-register__controls']}>
        <Button type='submit'>Sign Up</Button>
      </div>
      <div>
        Already have an account? Sign In <Link to='/login'>here</Link>
      </div>
    </form>
  );
};

function ErrorMessage({ message }: {message: string}): JSX.Element {
  return <div className={styles['form-error-validator']}>{message}</div>;
};


function useSignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function registerUser(email: string, password: string) {
    const users = getUsers();
    users.push({ email, password });
    setUsers(users);
    setCurrentUser(email)
    navigate(PATHS.HOME);
  }

  return {
    emailRef,
    passwordRef,
    passwordConfirmRef,
    registerUser
  }
}

export default SignUp;
