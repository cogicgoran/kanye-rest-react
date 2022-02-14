import React, {useState} from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/header/UI/button/Button';

const initLoginFormSubmitState = {
    email:"",
    password:""
}

function Login() {
    const [inputs, setInputs] = useState(initLoginFormSubmitState);

    function handleSubmit(event) {
        event.prevetDefault();
    };

    function handleChange(event) {
        setInputs(prevState => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <form className={styles['login-form']} onSubmit={handleSubmit}>
            <div className={styles['login-form__field']}>
                <input className="js-input-email" type="email" name="email" placeholder="example@example.com" required value={inputs.email} onChange={handleChange}/>
            </div>
            <div className={styles['login-form__field']}>
                <input className="js-input-password" type="password" name="password" placeholder="Password..." required value={inputs.password} onChange={handleChange} />
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