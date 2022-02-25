import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weather/weather';
import quotesReducer from './quotes/quotes';
import currentUserReducer from './current-user/currentUser';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        quotes: quotesReducer,
        currentUser: currentUserReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;