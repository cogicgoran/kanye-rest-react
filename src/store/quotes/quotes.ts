import { createSlice } from '@reduxjs/toolkit'

export const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        value: {
            prevQuotes: null,
            quotes: null
        },
    },
    reducers: {
        setPreviousQuotes: (state, action) => {
            state.value.prevQuotes = action.payload
        },
        setQuotes: (state, action) => {
            state.value.quotes = action.payload
        }
    },
})

export const { setPreviousQuotes, setQuotes } = quotesSlice.actions;

export default quotesSlice.reducer;