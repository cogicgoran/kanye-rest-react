import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/weather';
import quotesReducer from './quotes/quotes';

export default configureStore({
    reducer: {
        weather: weatherReducer,
        quotes: quotesReducer
    }
});