import React from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/header/UI/button/Button';
import styles from './Reports.module.css';

function Reports() {
    const buttonClasses = [styles['btn-remove-quotes'], 'hidden'].join(" ");

    return (
        <div>
            <Header to='/' label='Back'/>
            <div>
                <div></div>
                <div className={styles['reports__select-all-container']}>
                    <label htmlFor=''>Select All</label>
                    <br />
                    <input className={styles['reports__select-all']} type='checkbox' name='reports-select-all'/>
                </div>
                <Button className={buttonClasses}></Button>
            </div>
        </div>
    );
};

export default Reports;