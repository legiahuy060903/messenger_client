
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../services/socketClient";
import { callAddMessage, callConversations, callMessage } from "../../services/api"



export const getConversations = createAsyncThunk('message/getConversations', async (page = 1, { getState, rejectWithValue }) => {
    const { account: { _id } } = getState().user;
    const res = await callConversations({ limit: page * 9 });
    if (+res.result > 0) {
        const newArr = [];
        res.conversations && res.conversations.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== _id) {
                    newArr.push({ ...cv, text: item.text, media: item.media, call: item.call, updatedAt: item.updatedAt, online: false });
                }
            })
        })
        return { newArr, result: res.result }
    }
    return rejectWithValue()
})
export const addMessage = createAsyncThunk('message/add_message', async ({ data, method }, { getState }) => {
    if ("receive" === method) return data;
    const { user, message } = await callAddMessage(data);
    socket.emit('addMessage', { user, message });
    return message
})
export const getMessage = createAsyncThunk('message/get_message', async ({ id, page = 1 }, { getState }) => {
    const res = await callMessage(id, { limit: page * 9 });
    const newData = { ...res, messages: res.messages.reverse() };
    return { ...newData, _id: id, page }
})


export const addNewUser = createAsyncThunk('message/addNewUser', async (data, { getState, rejectWithValue }) => {
    const { users } = getState().message;
    if (users.some(item => item._id === data._id)) {
        return rejectWithValue()
    }
    return data
})

// export const getMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
//     try {
//         const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
//         const newData = { ...res.data, messages: res.data.messages.reverse() }
//         dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { ...newData, _id: id, page } })
//     } catch (err) {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
//     }
// }

// export const loadMoreMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
//     try {
//         const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.token)
//         const newData = { ...res.data, messages: res.data.messages.reverse() }
//         dispatch({ type: MESS_TYPES.UPDATE_MESSAGES, payload: { ...newData, _id: id, page } })
//     } catch (err) {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
//     }
// }

// export const deleteMessages = ({ msg, data, auth }) => async (dispatch) => {
//     const newData = DeleteData(data, msg._id)
//     dispatch({ type: MESS_TYPES.DELETE_MESSAGES, payload: { newData, _id: msg.recipient } })
//     try {
//         await deleteDataAPI(`message/${msg._id}`, auth.token)
//     } catch (err) {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
//     }
// }

// export const deleteConversation = ({ auth, id }) => async (dispatch) => {
//     dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id })
//     try {
//         await deleteDataAPI(`conversation/${id}`, auth.token)
//     } catch (err) {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
//     }
// }