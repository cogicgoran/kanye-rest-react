import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getPreviousQuotes, getQuotes, setPreviousQuotes, setQuotes as storageSetQuotes } from '../../helper/storage.functions';

interface Quote {
    quote:string;
    id:number;
    time?: number | undefined;
}

interface ReturnQuotes {
    quotes: Array<Quote>;
    fetchTasks:() => Promise<void>;
}


interface QuoteComplete {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: Date;
    updatedAt: Date | null;
}

interface LocationPath {
    state: {
        fromReports: string;
    }
}

export function useQuotes():ReturnQuotes {
    const url = 'https://api.kanye.rest/';
    const [quotes, setQuotes] = useState<Array<Quote>>([]);
    const location = useLocation() as LocationPath;
    let fetchCounter: number = 0;
    let fetchQuotes: Array<Quote> = [];

    useEffect(() => {
        const allQuotes = getQuotes();

        if(location && location.state?.fromReports && allQuotes.length > 4) {
            setQuotes(getPreviousQuotes());
        } else {
            fetchTasks();
        }
    }, []);

    function appendQuoteToDisplay(quote: Quote): void {
        setQuotes(prevQuotes => {
            return [...prevQuotes, quote]
        });
    };

    function updateStorage(quotesStorage: QuoteComplete[], quote: Quote): QuoteComplete {
        const matchedQuote = quotesStorage.find(storedQuote => {
            return storedQuote.body === quote.quote;
        });
        if (matchedQuote) {
            matchedQuote.count = matchedQuote.count + 1;
            matchedQuote.time = quote.time;
            matchedQuote.updatedAt = new Date();
            return matchedQuote

        } else {
            const newQuote: QuoteComplete = {
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

    function handleNewQuotes(quote : Quote): void {
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