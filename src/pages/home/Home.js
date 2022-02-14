import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuotesContext } from '../../context/quotes/QuotesContext';
import styles from './Home.module.css';

const url = 'https://api.kanye.rest/';

function Home() {
    const {quotes, fetchTasks} = useQuotes();
    
    return (
        <div>
            <header className={styles.header}>
                {/* <a href='receiptshtml'>Reports</a> */}
                <Link to='receipts'>Reports</Link>
                <button className='btn-logout js-btn-logout'>Sign Out</button>
            </header>
            <main className={styles.quotes}>
                <div className="quotes-container js-quotes-container">
                    {quotes.map((quote, index) => <Quote key={index} quote={quote.quote} />)}
                </div>
                <button onClick={() => fetchTasks()}>GET NEW QUOTES</button>
            </main>
        </div>
    );
};

function Quote({quote}) {
    return <div>{quote}</div>
}

function useQuotes(){
    const [quotes, setQuotes] = useState([]);
    const {quotes: allQuotes, setQuotes: setAllQuotes, setPrevQuotes} = useQuotesContext();

    useEffect(() => {
        fetchTasks();
    }, []);

    function appendQuoteToDisplay(quote) {
        setQuotes(prevQuotes => {
            return [...prevQuotes, quote]
        })
    }

    function handleNewQuotes(quote) {
        appendQuoteToDisplay(quote);

        const matchedQuote = allQuotes.find(storedQuote => {
            return storedQuote.body === quote.quote;
        });
        if (matchedQuote) {
            matchedQuote.count = matchedQuote.count + 1;
            matchedQuote.time = quote.time;
            matchedQuote.updatedAt = new Date();
            return matchedQuote
    
        } else {
            const newQuote = {
                body: quote.quote,
                count: 1,
                createdAt: new Date(),
                updatedAt: null,
                time: quote.time,
                id: Math.round(Math.random() * 100000)
            };
            // quotesStorage.push(newQuote);
            return newQuote;
        }
    }

    function getPromiseArray(n = 5) {
        const promiseArray = [];
        let timeBefore = Date.now();
        for (let i = 0; i < n; i++) {
            promiseArray.push(fetch(url)
                .then(res => res.json())
                .then(quote => {
                    const now = Date.now();
                    quote.time = now - timeBefore;
                    timeBefore = now;
                    return quote;
                }));
        };
        return promiseArray;
    }

    async function fetchTasks() {
        setQuotes([]);
        const quotesToBeFetched = 5;
        const quotes = await Promise.all(getPromiseArray(quotesToBeFetched));
        quotes.forEach(quote => {
            handleNewQuotes(quote);
        });
        // setAllQuotes(prevQuotes => [...prevQuotes, ...quotes]);
        setPrevQuotes(quotes);
    }

    return {quotes, fetchTasks};
}



export default Home;