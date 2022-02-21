import React, { useRef } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../helper/Paths';
import { findUserByEmailAndPassword, setCurrentUser } from '../../helper/storage.functions';

function Login(): JSX.Element {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (emailRef === null || passwordRef === null || emailRef.current == null || passwordRef.current === null){
            alert("Some error with useRef references");  
            return;
        }
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const foundUser = findUserByEmailAndPassword(email, password);
        if (foundUser) {
            setCurrentUser(email)
            navigate(PATHS.HOME);
            return;
        }
        // Display some errors
        alert("Invalid credentials");
    };

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit}>
            <div className={styles['login-form__field']}>
                <input ref={emailRef} type="email" name="email" placeholder="example@example.com" />
            </div>
            <div className={styles['login-form__field']}>
                <input ref={passwordRef} type="password" name="password" placeholder="Password..." />
            </div>
            <div className={styles['form-login__controls']}>
                <Button type='submit'>Sign In</Button>
            </div>
            <div>
                Don't have an account? Sign Up <Link to='/sign-up'>here</Link>
            </div>
        </form>
    );
};

export default Login;