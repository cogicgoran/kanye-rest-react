import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface QuotesState {
    value: {
        prevQuotes: any[];
        quotes: any[];
    }
}

const initialState: QuotesState = {
    value: {
        prevQuotes: [],
        quotes: []
    }
}

export const quotesSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        pushPreviousQuotes: (state, action: PayloadAction<any[]>) => {
            state.value.prevQuotes = [...action.payload];
        },
        setQuotes: (state, action: PayloadAction<any[]>) => {
            state.value.quotes = [...action.payload];
        },
        pushQuote: (state, action: PayloadAction<any>) => {
            state.value.quotes.push(action.payload);
        },
        editQuote: (state, action: PayloadAction<any>) => {
            state.value.quotes[action.payload.matchedIndex].count = state.value.quotes[action.payload.matchedIndex].count + 1;
            state.value.quotes[action.payload.matchedIndex].time = action.payload.time;
            state.value.quotes[action.payload.matchedIndex].updatedAt = new Date().toLocaleString();
        },
        cutQuotes: (state, action: PayloadAction<any>) => {
            const startIdx = action.payload; 
            const newValue = state.value.quotes.slice(0, startIdx).concat(state.value.quotes.slice(startIdx+1));
            console.log("all:", newValue);
            
            state.value.quotes = newValue;
        },
        cutPrevQuotes: (state, action: PayloadAction<any>) => {
            const startIdx = action.payload; 
            const newValue = state.value.prevQuotes.slice(0, startIdx).concat(state.value.prevQuotes.slice(startIdx+1));
            console.log("prev:", newValue);
            state.value.prevQuotes = newValue;
        }
    },
})

export const { pushPreviousQuotes, setQuotes, pushQuote, editQuote, cutQuotes, cutPrevQuotes } = quotesSlice.actions;
export const selectQuotes = (state: RootState) => state.quotes;

export default quotesSlice.reducer;