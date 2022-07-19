import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/news`
const fetcher = async (...args: [string, object]) => {
  const res = await fetch(...args)
  return res.json()
}

type responsePage = {
  success: boolean
  data: any[]
  meta: {
    page: number
    totalData: number
    totalDataOnPage: number
    totalPage: number
  }
  message: string
  code: number
}

export const useGetNewss = (
  queries: { page: string; limit: string },
  token: string
) => {
  const { page, limit } = queries
  const { data, error }: SWRResponse<responsePage, any> = useSWR(
    [
      `${address}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ],
    fetcher
  )
  return {
    news: data,
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
    method: 'PUT',
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
