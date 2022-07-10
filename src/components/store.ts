import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import authReducer from '../context/auth-slice';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.APP_ENV !== 'production',
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;