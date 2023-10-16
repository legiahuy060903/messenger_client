import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    info: null,
    isCall: false,
    idPeer: null,
}
export const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        modalCall: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },

        updatePeer: (state, action) => {
            state.idPeer = action.payload;
        }
    }
})
export const { modalCall, updatePeer } = callSlice.actions

export default callSlice.reducer