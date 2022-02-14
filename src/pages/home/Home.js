import React, { useEffect, useState } from 'react';
import { useQuotesContext } from '../../context/quotes/QuotesContext';
import styles from './Home.module.css';
import Header from '../../components/header/Header';
import Button from '../../components/header/UI/button/Button';
import { useLocation } from 'react-router-dom';

const url = 'https://api.kanye.rest/';

function Home() {
    const { quotes, fetchTasks } = useQuotes();
    

    return (
        <div>
            <Header to='reports' label='Reports' />
            <main className={styles.quotes}>
                <div className="quotes-container js-quotes-container">
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

function useQuotes() {
    const [quotes, setQuotes] = useState([]);
    const location = useLocation();
    let fetchCounter = 0;
    let fetchQuotes = [];

    useEffect(() => {
        const allQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
        if(location.state?.fromReports && allQuotes.length > 4) {
            setQuotes(JSON.parse(localStorage.getItem("previous-quotes")) || []);
        } else {
            fetchTasks();
        }
    }, []);

    function appendQuoteToDisplay(quote) {
        setQuotes(prevQuotes => {
            return [...prevQuotes, quote]
        })
    }

    function updateStorage(quotesStorage, quote) {
        const matchedQuote = quotesStorage.find(storedQuote => {
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
            quotesStorage.push(newQuote);
            return newQuote;
        }
    }

    function handleNewQuotes(quote) {
        const quotesStorage = JSON.parse(localStorage.getItem("quotes")) || [];

        appendQuoteToDisplay(quote);
        const updatedQuote = updateStorage(quotesStorage, quote);
        fetchQuotes.push({quote: updatedQuote.body, id: updatedQuote.id});
        fetchCounter++;
        if (fetchCounter === 5) {
            localStorage.setItem("previous-quotes", JSON.stringify(fetchQuotes));
            fetchCounter = 0;
            fetchQuotes = [];
        }
        localStorage.setItem("quotes", JSON.stringify(quotesStorage));

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
    }

    return { quotes, fetchTasks };
}



export default Home;