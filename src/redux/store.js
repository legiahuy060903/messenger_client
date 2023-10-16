import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './features/accountSlice';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import messageSlice from './features/messageSlice';
import onlineSlice from './features/onlineSlice';
import callSlice from './features/callSlice';



const reducers = combineReducers({
    user: accountSlice,
    message: messageSlice,
    online: onlineSlice,
    call: callSlice
});

const persistConfig = {
    key: "user",
    root: "root",
    storage,
    blacklist: ['message', 'online', "call",]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});
const persistor = persistStore(store);
export { store, persistor };