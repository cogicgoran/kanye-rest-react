import React from 'react';
import styles from './Home.module.css';
import Button from '../../components/UI/button/Button';
import { useQuotes } from './useQuotes';

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

function Quote({ quote }: {quote:string}): JSX.Element   {
    return <div>{quote}</div>;
};

export default Home;