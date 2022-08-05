import { responsePage } from '@/helpers/interface/pagination.interface';
import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/news`
const fetcher = async (...args: [string, object]) => {
  const res = await fetch(...args);
  if(!res.ok){
    const error = new Error('An error occurred while fetching');
    error['info'] = await res.json();
    error['status'] = res.status;
    throw error;
  }
  
  return await res.json();
}

export const useGetNewss = (
  queries: { page: string; limit: string, debouncedSearch?: string },
  token: string
) => {
  const { page, limit, debouncedSearch } = queries
  const { data, error }: SWRResponse<responsePage, any> = useSWR(
    [
      `${address}?page=${page}&limit=${limit}${debouncedSearch && '&search='+debouncedSearch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return
    
        // Only retry up to 10 times.
        if (retryCount >= 10) return
    
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000)
      }
    }
  )
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGetNews = (params: { id: string }, token: string) => {
  const { id } = params
  const { data, error } = useSWR([`${address}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }], fetcher, {shouldRetryOnError: false})
  return {
    news: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const postNews = async (
  payload,
  token: string
) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    formData.append(key, payload[key]);
  });
  const result = await fetcher(address, {
    headers: {
      'Accept': '*/*',
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    },
    method: 'POST',
    body: formData,
  })
  return result
}

export const putNews = async (
  payload,
  id,
  token: string
) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    formData.append(key, payload[key]);
  });
  const result = await fetcher(`${address}/${id}`, {
    headers: {
      'Accept': '*/*',
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    body: formData,
  })
  return result
}

export const deleteNews = async (id, token: string) => {
  const result = await fetcher(`${address}/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  })
  return result
}
