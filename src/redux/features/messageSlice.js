
import { createSlice } from '@reduxjs/toolkit';
import { getConversations, addMessage, getMessage } from '../action/message';
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
            let users = state.users || [];
            if (users.length === 0) {
                state.users = [action.payload]
            }
            else {
                let isUserPresent = users.some(item => item._id === action.payload._id);
                if (!isUserPresent) {
                    state.users = [action.payload, ...users];
                }
            }
            return state;
        },
        resetMessages: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                state.users = action.payload?.newArr;
                state.resultUsers = action.payload?.result;
                state.firstLoad = true
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.data = (state.data || []).map(item =>
                    item._id === action.payload.recipient || item._id === action.payload.sender
                        ? {
                            ...item,
                            messages: [...item.messages, action.payload],
                            result: item.result + 1
                        }
                        : item
                );
                state.users = (state.users || []).map(user =>
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
                console.log(state.users)
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.data = [...state?.data, action.payload]
            })
    }
});

export const { addUserToMessage, resetMessages } = messageSlice.actions;
export default messageSlice.reducer;
