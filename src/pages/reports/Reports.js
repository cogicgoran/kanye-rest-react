import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Button from '../../components/header/UI/button/Button';
import styles from './Reports.module.css';

function Reports() {
    const [quotes, setQuotes] = useState(JSON.parse(localStorage.getItem("quotes")) || []);
    const [checkedIds, setCheckedIds] = useState([]);
    const [isCheckedSelectAll, setIsCheckedSelectAll] = useState(false);

    function onCheckboxChange(id, checked) {
        if (checked && !checkedIds.includes(id)) {
            setCheckedIds(prevState => [...prevState, id]);
        }
        if (!checked && checkedIds.includes(id)) {
            checkedIds.splice(checkedIds.indexOf(id), 1);
            setCheckedIds([...checkedIds]);
            // setCheckedIds(checkedIds); IT DONT WORK
        }
    }

    useEffect(() => {
        if (checkedIds.length > 0) {

        } else {

        }
    }, [checkedIds])

    function handleSelectAllChange(event) {
        if (event.target.checked) {
            setIsCheckedSelectAll(true);
            setCheckedIds(quotes.map(quote => quote.id));
        } else {
            setIsCheckedSelectAll(false);
            setCheckedIds([]);
        }
    }

    function handleRemoveQuotes(){
        console.log("helo")
        const last5Quotes = JSON.parse(localStorage.getItem("previous-quotes")) || [];
        checkedIds.forEach(checkedId => {
            quotes.splice(quotes.indexOf(quotes.find(quote => {
                return quote.id == checkedId;
            })), 1);
            const item = last5Quotes.find(item => {
                return item.id == checkedId;
            })
            const id = last5Quotes.indexOf(item);
            if (id !== -1) {
                last5Quotes.splice(id, 1);
                localStorage.setItem("previous-quotes", JSON.stringify(last5Quotes));
            }
        });

        localStorage.setItem("quotes", JSON.stringify(quotes));
        setQuotes([...quotes]);
        setCheckedIds([]);
        setIsCheckedSelectAll(false)
    }

    const buttonClasses = checkedIds.length === 0 ? [styles['btn-remove-quotes'], 'hidden'].join(" ") : styles['btn-remove-quotes'];

    return (
        <div>
            <Header to='/' fromReports={true} label='Back' />
            <div>
                <div>
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
        <div>{updatedAt && `Updated At: ${updatedAt}`}</div>
        <div>Time to Fetch: {timeToFetch ? `${timeToFetch}ms` : "Unknown"}</div>
        <input type='checkbox' checked={checked} onChange={handleChange} />
    </div>
}


export default Reports;