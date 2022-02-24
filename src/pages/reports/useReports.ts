import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { cutQuotes, cutPrevQuotes } from '../../store/quotes/quotes';

interface QuoteComplete {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: string;
    updatedAt: string | null;
}

interface ReportsReturn {
    quotes: QuoteComplete[];
    checkedIds: number[];
    onCheckboxChange:(id: number, checked: boolean) => void;
    handleSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isCheckedSelectAll: boolean;
    handleRemoveQuotes: () => void;
}

export function useReports(): ReportsReturn {
    const dispatch = useAppDispatch();
    const prevQuotes = useAppSelector((state) => state.quotes.value.prevQuotes);
    const quotesAll = useAppSelector((state) => state.quotes.value.quotes);
    const [checkedIds, setCheckedIds] = useState<Array<number>>([]);
    const [isCheckedSelectAll, setIsCheckedSelectAll] = useState(false);

    function onCheckboxChange(id: number, checked: boolean): void {
        if (checked && !checkedIds.includes(id)) {
            setCheckedIds((prevState => [...prevState, id]));
            return;
        }
        if (!checked && checkedIds.includes(id)) {
            checkedIds.splice(checkedIds.indexOf(id), 1);
            setCheckedIds([...checkedIds]);
        }
    }

    function handleSelectAllChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.checked) {
            setIsCheckedSelectAll(true);
            setCheckedIds(quotesAll.map((quote: QuoteComplete) => quote.id));
        } else {
            setIsCheckedSelectAll(false);
            setCheckedIds([]);
        }
    }

    function handleRemoveQuotes() {
        checkedIds.forEach(checkedId => {
            const foundQuote = quotesAll.find((quote: QuoteComplete): boolean => quote.id === checkedId);
            const idx = quotesAll.indexOf(foundQuote);
            if (idx !== -1) {
                dispatch(cutQuotes(idx))
            }
            const foundPrevQuote = prevQuotes.find((item: QuoteComplete): boolean => item.id === checkedId);
            const foundPrevIdx = prevQuotes.indexOf(foundPrevQuote);
            if( foundPrevIdx !== -1 ) {
                dispatch(cutPrevQuotes(foundPrevIdx))
            }
        });

        setCheckedIds([]);
        setIsCheckedSelectAll(false);
    }

    return { quotes: quotesAll, checkedIds, onCheckboxChange, handleSelectAllChange, isCheckedSelectAll, handleRemoveQuotes }
}