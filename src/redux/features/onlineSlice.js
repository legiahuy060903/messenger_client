import { createSlice } from '@reduxjs/toolkit';
const initialState = []
export const onlineSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        handleUserOnline: (state, action) => {
            return [...state, action.payload];
        },
        handleUserOffline: (state, action) => {
            return state.filter(item => item !== action.payload)
        },

    }
})
export const { handleUserOnline, handleUserOffline } = onlineSlice.actions

export default onlineSlice.reducer