import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import '@/styles/globals.css'
import { store } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

let persistor = persistStore(store)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
