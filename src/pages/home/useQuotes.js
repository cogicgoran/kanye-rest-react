import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getPreviousQuotes, getQuotes, setPreviousQuotes, setQuotes as storageSetQuotes } from '../../helper/storage.functions';

export function useQuotes() {
    const url = 'https://api.kanye.rest/';
    const [quotes, setQuotes] = useState([]);
    const location = useLocation();
    let fetchCounter = 0;
    let fetchQuotes = [];

    useEffect(() => {
        const allQuotes = getQuotes();

        if(location.state?.fromReports && allQuotes.length > 4) {
            setQuotes(getPreviousQuotes());
        } else {
            fetchTasks();
        }
    }, []);

    function appendQuoteToDisplay(quote) {
        setQuotes(prevQuotes => {
            return [...prevQuotes, quote]
        });
    };

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
    };

    function handleNewQuotes(quote) {
        const quotesStorage = getQuotes();
        const updatedQuote = updateStorage(quotesStorage, quote);

        appendQuoteToDisplay(quote);
        fetchQuotes.push({quote: updatedQuote.body, id: updatedQuote.id});
        fetchCounter++;
        if (fetchCounter === 5) {
            setPreviousQuotes(fetchQuotes);
            fetchCounter = 0;
            fetchQuotes = [];
        }
        localStorage.setItem("quotes", JSON.stringify(quotesStorage));
        storageSetQuotes(quotesStorage);
    };

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
    };

    async function fetchTasks() {
        setQuotes([]);
        const quotesToBeFetched = 5;
        const quotes = await Promise.all(getPromiseArray(quotesToBeFetched));
        quotes.forEach(quote => {
            handleNewQuotes(quote);
        });
    };

    return { quotes, fetchTasks };
};