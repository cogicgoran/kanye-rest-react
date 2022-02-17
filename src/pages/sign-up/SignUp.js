import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';
import Button from '../../components/header/UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { validateInputs } from './SignUp.validator';
import { PATHS } from '../../helper/Paths';

function SignUp() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    const errors = {email:{errors:[]}, password:{errors:[]}, passwordConfirm:{errors:[]}};
    setIsError(false);
    validateInputs({email, password, passwordConfirm}, errors);
    if (errors.isError) {
      setIsError(true);
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('current-user', JSON.stringify({ email }));
    navigate(PATHS.HOME);
    console.log(email, password, passwordConfirm);
  };


  return (
    <form className={styles['form-register']} onSubmit={handleSubmit}>
        <div className={styles['form-register__input']}>
            <label htmlFor="">Email</label>
            <input ref={emailRef} type="email" name="email" required placeholder="example@example.com" />
        </div>
        <div className={styles['form-register__input']}>
            <label htmlFor="">Password</label>
            <input ref={passwordRef} type="password" name="password" required placeholder="Password..." />
        </div>
        <div className={styles['form-register__input']}>
            <label htmlFor="">Confirm Password</label>
            <input ref={passwordConfirmRef} type="password" name="password-change" required placeholder="Confirm Password..." />
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

export default SignUp;