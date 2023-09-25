import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './features/accountSlice';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    PERSIST
} from 'redux-persist'


const reducers = combineReducers({
    account: accountSlice
});

const persistConfig = {
    key: "key",
    root: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST]
            }
        }),
});
const persistor = persistStore(store);
export { store, persistor };