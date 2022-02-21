import React from 'react';
import styles from './Home.module.css';
import Button from '../../components/button/Button';
import { useQuotes } from './useQuotes';

interface Quote {
    quote: string
}

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

function Quote({ quote }: Quote): JSX.Element   {
    return <div>{quote}</div>;
};

export default Home;