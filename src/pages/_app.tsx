import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { AppProps } from 'next/app';
import { useState } from 'react';
import 'swiper/css/bundle';

import '@/styles/globals.css';
import '@/styles/textEditor.css';

import { navigation } from '@/components/resource/navigation';

import { OpenContext, StateHomePage, TableContext, TokenContext } from '@/helpers/hooks/use-context';
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [dataNews, setDataNews] = useState([]);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataNavigation, setDataNavigation] = useState(navigation);
  const [openHome, setOpenHome] = useState(false);
  const [openSub1, setOpenSub1] = useState({ state: false, posisi: 0 });
  const [openSub2, setOpenSub2] = useState({ state: false, posisiParent: 0, posisi: 0 });
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <TokenContext.Provider value={{token, setToken}}>
          <OpenContext.Provider value={{open, setOpen}}>
            <TableContext.Provider value={
              {
                pageState: {
                  page,
                  setPage,
                },
                limitState: {
                  limit,
                  setLimit,
                },
                searchState: {
                  search,
                  setSearch,
                }
              }}>
              <StateHomePage.Provider value={{
                news: {data: dataNews, setData: setDataNews}, 
                activity: {data: dataActivity, setData: setDataActivity},
                navigation: {data: dataNavigation, setData: setDataNavigation, openSub1, openSub2, open: openHome, setOpen: setOpenHome, setOpenSub1, setOpenSub2},
                }}>
                <Component {...pageProps} />
              </StateHomePage.Provider>
            </TableContext.Provider>
          </OpenContext.Provider>
        </TokenContext.Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
  );
}
