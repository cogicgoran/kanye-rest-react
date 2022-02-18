import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/header/Header';
import Button from '../../components/header/UI/button/Button';
import { useQuotes } from './useQuotes';
import { PATHS } from '../../helper/Paths';

function Home() {
    const { quotes, fetchTasks } = useQuotes();
    
    return (
        <div>
            <main className={styles.quotes}>
                <div className={styles['quotes-container']}>
                    {quotes.map((quote, index) => <Quote key={index} quote={quote.quote} />)}
                </div>
                <Button onClick={() => fetchTasks()}>GET NEW QUOTES</Button>
            </main>
        </div>
    );
};

function Quote({ quote }) {
    return <div>{quote}</div>
}





export default Home;