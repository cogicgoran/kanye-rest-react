import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Button from './UI/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../helper/Paths';

function Header({to, label, fromReports}) {
    const navigate = useNavigate();

    function handleLogoutClick(){
        localStorage.removeItem('current-user');
        navigate(PATHS.LOGIN);
    }

    return (
        <header className={styles.header}>
            <Link to={to} state={{fromReports}}>{label}</Link>
            <Button className={styles['btn-logout']} onClick={handleLogoutClick}>Sign Out</Button>
        </header>
    );
};

export default Header;