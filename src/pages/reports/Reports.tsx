import React from 'react';
import Button from '../../components/UI/button/Button';
import styles from './Reports.module.css';
import { useReports } from './useReports';

function Reports(): JSX.Element {
    const { quotes, checkedIds, isCheckedSelectAll, onCheckboxChange, handleSelectAllChange, handleRemoveQuotes } = useReports();
    const buttonClasses: string = checkedIds.length === 0 ? [styles['btn-remove-quotes'], 'hidden'].join(" ") : styles['btn-remove-quotes'];

    return (
        <div>
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

interface ReportsQuoteProps {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: Date;
    updatedAt: Date | null;
    onCheckboxChange: (id: number, checked: boolean) => void;
    checked: boolean;
}

function ReportsQuote({ body, count, createdAt, updatedAt, time: timeToFetch, id, onCheckboxChange, checked }: ReportsQuoteProps): JSX.Element {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
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