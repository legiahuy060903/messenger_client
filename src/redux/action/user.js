import { createAsyncThunk } from "@reduxjs/toolkit";
import { callFetchAccount, callUpdateAccount } from "../../services/api";


export const fetchAccount = createAsyncThunk('account/fetchAccount', async (_, { rejectWithValue }) => {
    const response = await callFetchAccount();
    if (response.success == false) {
        return rejectWithValue(response);
    }
    return response.account
})
export const updateTheme = createAsyncThunk('account/updateTheme', async (data, { rejectWithValue }) => {
    const response = await callUpdateAccount(data);
    if (response.success == false) {
        return rejectWithValue(response);
    }
    return response.data.dark_mode
})