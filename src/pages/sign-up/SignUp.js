import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Button from '../../components/header/UI/button/Button';
import { Link } from 'react-router-dom';

const initSignUpFormSubmitState = {
  email:"",
  password:"",
  'password-change':""
}

function SignUp() {
  const [inputs, setInputs] = useState(initSignUpFormSubmitState);

  function handleSubmit(event) {
    event.prevetDefault();
  };

  function handleChange(event) {
    setInputs(prevState => {
      return {
        ...prevState,
        [event.target.name]:event.target.value
      }
    })
  }

  return (
    <form className={styles['form-register']} onSubmit={handleSubmit}>
        <div className={styles['form-register__input']}>
            <label for="">Email</label>
            <input type="email" name="email" required placeholder="example@example.com" value={inputs.email} onChange={handleChange} />
        </div>
        <div className={styles['form-register__input']}>
            <label for="">Password</label>
            <input type="password" name="password" required placeholder="Password..." value={inputs.password} onChange={handleChange}   />
        </div>
        <div className={styles['form-register__input']}>
            <label for="">Confirm Password</label>
            <input type="password" name="password-change" required placeholder="Confirm Password..." value={inputs.passwordConfirm} onChange={handleChange}  />
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