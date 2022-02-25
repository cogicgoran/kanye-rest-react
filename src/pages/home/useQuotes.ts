import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { pushPreviousQuotes, pushQuote, editQuote } from '../../store/quotes/quotes';
import { QuoteComplete, Quote } from '../../interfaces/interfaces';

interface ReturnQuotes {
    quotes: Array<Quote>;
    fetchTasks:() => Promise<void>;
};

interface LocationPath {
    state: {
        fromReports: string;
    }
};

export function useQuotes():ReturnQuotes {
    const dispatch = useAppDispatch();
    const prevQuotes = useAppSelector((state) => state.quotes.value.prevQuotes);
    const quotesAll = useAppSelector((state) => state.quotes.value.quotes);
    const [quotes, setQuotes] = useState<Array<Quote>>([]);
    const location = useLocation() as LocationPath;
    const url = 'https://api.kanye.rest/';
    let fetchCounter: number = 0;
    let fetchQuotes: Array<Quote> = [];

    useEffect(() => {
        if(location && location.state?.fromReports && quotesAll.length > 4 && prevQuotes.length > 0 ) {
            setQuotes(prevQuotes);
        } else {
            fetchTasks();
        }
    }, []);

    function appendQuoteToDisplay(quote: Quote): void {
        setQuotes(prevQuotes => {
            return [...prevQuotes, quote]
        });
    };

    function updateStorage(quote: Quote): QuoteComplete {
        let matchedIndex;
        const matchedQuote = quotesAll.find((storedQuote: QuoteComplete) => {
            return storedQuote.body === quote.quote;
        })
        if( matchedQuote) {
            matchedIndex = quotesAll.indexOf(matchedQuote);
        }
        if (matchedIndex !== -1 && matchedIndex !== undefined)  {
            dispatch(editQuote({matchedIndex, time:quote.time}));
            return quotesAll[matchedIndex];
        } else {
            const newQuote: QuoteComplete = {
                body: quote.quote,
                count: 1,
                createdAt: new Date().toLocaleString(),
                updatedAt: null,
                time: quote.time,
                id: Math.round(Math.random() * 100000)
            };
            dispatch(pushQuote(newQuote));
            return newQuote;
        }
    };

    function handleNewQuotes(quote : Quote): void {
        const updatedQuote = updateStorage(quote);
        appendQuoteToDisplay(quote);
        fetchQuotes.push({quote: updatedQuote.body, id: updatedQuote.id});
        fetchCounter++;
        if (fetchCounter === 5) {
            dispatch(pushPreviousQuotes(fetchQuotes));
            fetchCounter = 0;
            fetchQuotes = [];
        }
    };

    function getPromiseArray(numberOfFetches: number = 5): Promise<any>[] {
        const promiseArray:Promise<any>[] = [];
        let timeBefore = Date.now();
        for (let i = 0; i < numberOfFetches; i++) {
            promiseArray.push(fetch(url)
                .then((res) => res.json())
                .then((quote: Quote): Quote => {
                    const now = Date.now();
                    quote.time = now - timeBefore;
                    timeBefore = now;
                    return quote;
                }));
        };
        return promiseArray;
    };

    async function fetchTasks(): Promise<void> {
        setQuotes([]);
        const quotesToBeFetched = 5;
        const quotes = await Promise.all(getPromiseArray(quotesToBeFetched)) as Quote[];
        quotes.forEach(quote => {
            handleNewQuotes(quote);
        });
    };

    return { quotes, fetchTasks };
};