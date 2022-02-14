import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Button from './UI/button/Button';

function Header({to, label, fromReports}) {
    return (
        <header className={styles.header}>
            <Link to={to} state={{fromReports}}>{label}</Link>
            <Button>Sign Out</Button>
        </header>
    );
};

export default Header;