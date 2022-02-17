import { useState } from "react";
import { setQuotes as storageSetQuotes } from "../../helper/storage.functions";

export function useReports(){
    const [quotes, setQuotes] = useState(JSON.parse(localStorage.getItem("quotes")) || []);
    const [checkedIds, setCheckedIds] = useState([]);
    const [isCheckedSelectAll, setIsCheckedSelectAll] = useState(false);

    function onCheckboxChange(id, checked) {
        if (checked && !checkedIds.includes(id)) {
            setCheckedIds(prevState => [...prevState, id]);
        }
        if (!checked && checkedIds.includes(id)) {
            checkedIds.splice(checkedIds.indexOf(id), 1);
            setCheckedIds([...checkedIds]);
        }
    }
    
    function handleSelectAllChange(event) {
        if (event.target.checked) {
            setIsCheckedSelectAll(true);
            setCheckedIds(quotes.map(quote => quote.id));
        } else {
            setIsCheckedSelectAll(false);
            setCheckedIds([]);
        }
    }
    
    function handleRemoveQuotes(){
        const last5Quotes = JSON.parse(localStorage.getItem("previous-quotes")) || [];
        checkedIds.forEach(checkedId => {
            quotes.splice(quotes.indexOf(quotes.find(quote => quote.id === checkedId)), 1);
            const item = last5Quotes.find(item => item.id === checkedId)
            const id = last5Quotes.indexOf(item);
            if (id !== -1) {
                last5Quotes.splice(id, 1);
                localStorage.setItem("previous-quotes", JSON.stringify(last5Quotes));
            }
        });
    
        setQuotes([...quotes]);
        storageSetQuotes(quotes);
        setCheckedIds([]);
        setIsCheckedSelectAll(false)
    }

    return {quotes, checkedIds, onCheckboxChange, handleSelectAllChange, isCheckedSelectAll, handleRemoveQuotes}
}