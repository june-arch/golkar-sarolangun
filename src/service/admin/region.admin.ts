import { fetcher } from '@/helpers/utils/common';
import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/region`

export const useGetRegions = (
  queries: { page: string; limit: string, debouncedSearch?: string },
  token: string
) => {
  const { page, limit, debouncedSearch } = queries
  const { data, error } = useSWR(
    [
      `${address}?page=${page}&limit=${limit}${debouncedSearch && '&search=' + debouncedSearch}`,
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
export const useGetRegionsList = (token: string) => {
  const { data, error }: SWRResponse<any, any> = useSWR(
    [
      `${address}/list`,
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
    regions: data,
    isLoading: !error && !data,
    isError: error,
  }
}
export const useGetRegion = (params: { id: string }, token: string) => {
  const { id } = params
  const { data, error } = useSWR([`${address}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }], fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return

      // Only retry up to 10 times.
      if (retryCount >= 10) return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })
  return {
    region: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const postRegion = async (
  payload: { name: string; kemendagri_code: string },
  token: string
) => {
  try {
    const result = await fetcher(address, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return result
  } catch (error) {
    return error;
  }
}

export const patchRegion = async (
  payload: { name?: string; kemendagri_code?: string },
  id,
  token: string
) => {
  try {
    const result = await fetcher(`${address}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(payload),
    })
    return result
  } catch (error) {
    return error;
  }
}

export const deleteRegion = async (id, token: string) => {
  try {
    const result = await fetcher(`${address}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    })
    return result
  } catch (error) {
    return error;
  }
}
