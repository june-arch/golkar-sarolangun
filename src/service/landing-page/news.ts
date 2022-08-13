import useSWR, { SWRResponse } from 'swr';

import { responsePage } from '@/helpers/interface/pagination.interface';
import { fetcher } from '@/helpers/utils/common';

const domain = process.env.DOMAIN_API;
const address = `${domain}/api/v1/news`;

export const useGetNewss = (queries: {
  page: string;
  limit: string;
  debouncedSearch?: string;
  category?: string;
}) => {
  const { page, limit, debouncedSearch = '', category = '' } = queries;
  const { data, error }: SWRResponse<responsePage, any> = useSWR(
    [
      `${address}?page=${page}&limit=${limit}${
        debouncedSearch && '&search=' + debouncedSearch
      }${category && '&category=' + category}`,
    ],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useGetNews = (params: { id: string }) => {
  const { id } = params;
  const { data, error } = useSWR([`${address}/${id}`], fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;

      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  return {
    news: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getOneNews = async (params: { id: string }) => {
  const { id } = params;
  const res = await fetch(`${address}/${id}`);
  return res.json();
};
