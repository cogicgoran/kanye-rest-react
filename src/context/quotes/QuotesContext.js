import React, { useContext, useEffect, useState } from 'react';

const QuotesContext = React.createContext();

function QuotesContextProvider({ children }) {
    const [quotes, setQuotes] = useState([]);
    const [prevQuotes, setPrevQuotes] = useState([]);
    
    useEffect(() => {
        const quotesStorage = JSON.parse(localStorage.getItem("quotes")) || [];
        const prevQuotes = JSON.parse(localStorage.getItem("previous-quotes")) || [];
        setQuotes(quotesStorage);
        setPrevQuotes(prevQuotes);
    }, []);
    
    return (
        <QuotesContext.Provider value={{quotes, setQuotes, prevQuotes, setPrevQuotes}}>
            {children}
        </QuotesContext.Provider>
    );
};

export function useQuotesContext(){
    return useContext(QuotesContext);
};

export default QuotesContextProvider;
