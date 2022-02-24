import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/weather';
import quotesReducer from './quotes/quotes';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        quotes: quotesReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;