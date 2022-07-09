import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { AppProps } from "next/app";

import '@/styles/globals.css';
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}