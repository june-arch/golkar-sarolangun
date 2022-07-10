import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { AppProps } from "next/app";
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import { store } from '@/components/store';
import { MenuProvider } from '@/context/Menu.context';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

let persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <Component {...pageProps} />
          </MenuProvider>
        </PersistGate>
      </Provider>
  );
}