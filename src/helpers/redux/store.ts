import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import authReducer from './slice/auth-slice-admin'
import navigationReducer from './slice/navigation-slice-admin'

const reducers = combineReducers({
  auth: authReducer,
  navigationAdmin: navigationReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  timeout: 60,
  whitelist: ['auth'],
}
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.APP_ENV !== 'production',
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
