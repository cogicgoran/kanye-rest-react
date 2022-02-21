import React, { useState } from "react";
import { setQuotes as storageSetQuotes } from "../../helper/storage.functions";

interface QuoteComplete {
    id: number;
    count: number;
    time?: number;
    body: string;
    createdAt: Date;
    updatedAt: Date | null;
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
    const [quotes, setQuotes] = useState(JSON.parse(localStorage.getItem("quotes") as string) || []);
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
            setCheckedIds(quotes.map((quote: QuoteComplete) => quote.id));
        } else {
            setIsCheckedSelectAll(false);
            setCheckedIds([]);
        }
    }

    function handleRemoveQuotes() {
        const last5Quotes: QuoteComplete[] = JSON.parse(localStorage.getItem("previous-quotes") as string) || [];
        checkedIds.forEach(checkedId => {
            quotes.splice(quotes.indexOf(quotes.find((quote: QuoteComplete): boolean => quote.id === checkedId)), 1);
            const item: QuoteComplete | undefined = last5Quotes.find((item: QuoteComplete): boolean => item.id === checkedId);
            if (item) {
                const id: number | undefined = last5Quotes.indexOf(item);
                last5Quotes.splice(id, 1);
                localStorage.setItem("previous-quotes", JSON.stringify(last5Quotes));
            }
        });

        setQuotes([...quotes]);
        storageSetQuotes(quotes);
        setCheckedIds([]);
        setIsCheckedSelectAll(false)
    }

    return { quotes, checkedIds, onCheckboxChange, handleSelectAllChange, isCheckedSelectAll, handleRemoveQuotes }
}