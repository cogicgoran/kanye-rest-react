import React from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../helper/Paths';
import { findUserByEmailAndPassword, setCurrentUser } from '../../helper/storage.functions';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/UI/form-error-message/FormErrorMessage';
import { useAppDispatch } from '../../hooks/hooks';
import { setReduxCurrentUser } from '../../store/current-user/currentUser';

interface FormData {
    email: string;
    password: string;
}

function Login(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm<FormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all'
    });

    const emailErrors = [];
    const passwordErrors = [];
    for (const iterator in errors.email?.types) {
        if (iterator === 'required') emailErrors.push('Field required!');
        if (iterator === 'invalidEmail') emailErrors.push('Invalid email!');
    }
    for (const iterator in errors.password?.types) {
        if (iterator === 'required') passwordErrors.push('Field required!');
        if (iterator === 'minLength') passwordErrors.push('Password must be at least 8 characters long!');
        if (iterator === 'characterTypes') passwordErrors.push('Password must contain at least one capital letter and at least one number!');
    }

    function onSubmit(data: FormData): void {
        const foundUser = findUserByEmailAndPassword(data.email, data.password);
        if (foundUser) {
            setCurrentUser(data.email);
            dispatch(setReduxCurrentUser(data.email));
            navigate(PATHS.HOME);
            return;
        }
        // Display some errors
        alert("Invalid credentials");
    };

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)} onChange={() => clearErrors()}>
            <div className={styles['login-form__field']}>
                <input {
                    ...register('email', {
                        required: true,
                        validate: {
                            invalidEmail: (value) => /\S+@\S+\.\S+/.test(value),
                        }
                    })} placeholder="example@example.com" />
                {emailErrors.length > 0 && emailErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
            </div>
            <div className={styles['login-form__field']}>
                <input {
                    ...register('password', {
                        minLength: 8,
                        required: true,
                        validate: {
                            characterTypes: (value) => /[A-Z]/.test(value) && /\d/.test(value),
                        }
                    })} placeholder="Password..." />
                {passwordErrors.length > 0 && passwordErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
            </div>
            <div className={styles['form-login__controls']}>
                <Button type='submit'>Sign In</Button>
            </div>
            <div>
                Don't have an account? Sign Up <Link to='/sign-up'>here</Link>
            </div>
        </form>
    )
};

export default Login;