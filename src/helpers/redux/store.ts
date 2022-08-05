import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import auth from './slice/auth-admin.slice'
import navigationAdmin from './slice/navigation-admin.slice'
import activity from './slice/activity.slice'
import news from './slice/news.slice'
import categoryActivity from './slice/category-activity.slice'
import categoryNews from './slice/category-news.slice'
import region from './slice/region.slice'
import member from './slice/member.slice'

const reducers = combineReducers({
  auth,
  navigationAdmin,
  activity,
  news,
  categoryActivity,
  categoryNews,
  region,
  member
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
