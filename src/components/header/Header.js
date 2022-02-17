import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Button from './UI/button/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../helper/Paths';
import { removeCurrentUser } from '../../helper/storage.functions';

function Header({fromReports}) {
    const navigate = useNavigate();

    function handleLogoutClick(){
        removeCurrentUser();
        navigate(PATHS.LOGIN);
    }

    return (
        <header className={styles.header}>
            <Link to={PATHS.WEATHER}>WEATHER</Link>
            <Link to={PATHS.HOME} fromReports={fromReports}>HOME</Link>
            <Link to={PATHS.REPORTS}>REPORTS</Link>
            <Button className={styles['btn-logout']} onClick={handleLogoutClick}>Sign Out</Button>
        </header>
    );
};

export default Header;