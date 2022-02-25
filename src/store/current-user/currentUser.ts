import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const initialState : { user: string | null } = {
    user : null
}

export const currentUserSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        setReduxCurrentUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        removeReduxCurrentUser: (state) => {
            state.user = null;
        }
    },
})

export const { setReduxCurrentUser, removeReduxCurrentUser } = currentUserSlice.actions;
export const selectCurrentUser = (state: RootState) => state.quotes;

export default currentUserSlice.reducer;