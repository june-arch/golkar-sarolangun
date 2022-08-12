import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'swiper/css/bundle';

import '@/styles/globals.css';
import '@/styles/textEditor.css';

import { store } from '@/helpers/redux/store';
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
