import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/member`
const fetcher = (...args: [string, object]) =>
  fetch(...args).then((res) => res.json())

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

export const useGetMembers = (
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
    member: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGetMember = (params: { id: string }, token: string) => {
  const { id } = params
  const { data, error } = useSWR([`${address}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }], fetcher, {shouldRetryOnError: false})
  return {
    member: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const postMember = async (
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

export const patchMember = async (
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

export const deleteMember = async (id, token: string) => {
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
