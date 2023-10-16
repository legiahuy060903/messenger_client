
import { createSlice } from '@reduxjs/toolkit';
import { getConversations, addMessage, getMessage, addNewUser } from '../action/message';
const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addUserToMessage: (state, action) => {
            let isUserPresent = state.users.some(item => item._id === action.payload._id)
            if (!isUserPresent) {
                state.users = [action.payload, ...state.users];
            }

        },
        resetMessages: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                return {
                    ...state,
                    users: action.payload?.newArr || [],
                    resultUsers: action.payload?.result || 0,
                    firstLoad: true
                }
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.data = state.data.map(item =>
                    item._id === action.payload.recipient || item._id === action.payload.sender
                        ? {
                            ...item,
                            messages: [...item.messages, action.payload],
                            result: item.result + 1
                        }
                        : item
                );
                state.users = state.users.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? {
                            ...user,
                            text: action.payload.text,
                            media: action.payload.media,
                            call: action.payload.call,
                            updatedAt: action.payload.updatedAt
                        }
                        : user
                );
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.data = [...state?.data, action.payload];
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users = [action.payload, ...state?.users];
                state.resultUsers += 1;
            })
    }
});

export const { addUserToMessage, resetMessages } = messageSlice.actions;
export default messageSlice.reducer;
