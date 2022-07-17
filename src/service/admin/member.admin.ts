import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/member`
const fetcher = (...args: [string, object]) =>
  fetch(...args).then((res) => res.json())

type responseMemberPage = {
  success: boolean
  data: any[]
  meta: {
    page: number
    totalData: number
    totalDataOnpage: number
    totalPages: number
  }
  message: string
  code: number
}

export const getMembers = (
  queries: { page: string; limit: string },
  token: string
) => {
  const { page, limit } = queries
  const { data, error }: SWRResponse<responseMemberPage, any> = useSWR(
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
