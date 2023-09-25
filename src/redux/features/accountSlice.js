import { createSlice } from '@reduxjs/toolkit';
import { fetchAccount, updateTheme } from '../action/user';
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    dark_mode: "dark",
    language: 'vi',
    account: null
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.account = action.payload.account;
            state.language = action.payload.language;
            state.dark_mode = action.payload.dark_mode;
        },
        getAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.account = action.payload;
        },
        doLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.account = null;
            state.isAuthenticated = false;
        },
        changeTheme: (state, action) => {
            state.dark_mode = action.payload
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAccount.pending, (state) => {
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(fetchAccount.rejected, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                localStorage.removeItem('access_token');
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.account = action.payload;
                state.isLoading = false
            })
            .addCase(updateTheme.fulfilled, (state, action) => {
                state.dark_mode = action.payload
            })
    }
})
export const { changeTheme, changeLanguage, doLogoutAction, getAccountAction, doLoginAction } = accountSlice.actions

export default accountSlice.reducer