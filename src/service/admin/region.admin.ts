import useSWR from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/region`
const fetcher = async (...args: [string, object]) => {
  const res = await fetch(...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  // if (!res.ok) {
  //   const error = new Error('An error occurred while fetching the data.')
  // Attach extra info to the error object.
  //   error['info'] = await res.json()
  //   error['status'] = res.status
  //   throw error
  // }

  return res.json()
}

export const useGetRegions = (
  queries: { page: string; limit: string },
  token: string
) => {
  const { page, limit } = queries
  const { data, error } = useSWR(
    [
      `${address}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ],
    fetcher,
    { shouldRetryOnError: false }
  )
  return {
    region: data,
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
  }], fetcher, {shouldRetryOnError: false})
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
}

export const patchRegion = async (
  payload: { name?: string; kemendagri_code?: string },
  id,
  token: string
) => {
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
}

export const deleteRegion = async (id, token: string) => {
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
