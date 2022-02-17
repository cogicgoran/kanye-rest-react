import React from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/header/UI/button/Button';
import styles from './Reports.module.css';
import { useReports } from './useReports';

function Reports() {
    const {quotes, checkedIds, isCheckedSelectAll, onCheckboxChange, handleSelectAllChange, handleRemoveQuotes} = useReports();
    const buttonClasses = checkedIds.length === 0 ? [styles['btn-remove-quotes'], 'hidden'].join(" ") : styles['btn-remove-quotes'];

    return (
        <div>
            <Header to='/' fromReports={true} label='Back' />
            <div>
                <div className={styles['quote-history-container']}>
                    {quotes.map(quote => <ReportsQuote key={quote.id} onCheckboxChange={onCheckboxChange} {...quote} checked={checkedIds.includes(quote.id)} />)}
                </div>
                <div className={styles['reports__select-all-container']}>
                    <label htmlFor=''>Select All</label>
                    <br />
                    <input className={styles['reports__select-all']} type='checkbox' name='reports-select-all' onChange={handleSelectAllChange} checked={isCheckedSelectAll} />
                </div>
                <Button className={buttonClasses} onClick={handleRemoveQuotes}>Remove Quotes <br /> ({checkedIds
                    .length} items selected)</Button>
            </div>
        </div>
    );
};

function ReportsQuote({ body, count, createdAt, updatedAt, time: timeToFetch, id, onCheckboxChange, checked }) {
    function handleChange(event) {
        onCheckboxChange(id, event.target.checked);
    }

    return <div className={styles['history__quote']}>
        <div className={styles.quoted}>{body}</div>
        <div>Count: {count}</div>
        <div>Created At: {new Date(createdAt).toLocaleString()}</div>
        <div>{updatedAt && `Updated At: ${new Date(updatedAt).toLocaleString()}`}</div>
        <div>Time to Fetch: {timeToFetch ? `${timeToFetch}ms` : "Unknown"}</div>
        <input type='checkbox' checked={checked} onChange={handleChange} />
    </div>
}

export default Reports;