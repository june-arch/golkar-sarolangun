import useSWR, { SWRResponse } from 'swr'

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/admin/activity`
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

export const useGetActivities = (queries: { page: string; limit: string }) => {
  const { page, limit } = queries
  const { data, error }: SWRResponse<responsePage, any> = useSWR(
    [
      `${address}?page=${page}&limit=${limit}`,
    ],
    fetcher
  )
  return {
    activity: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGetActivity = (params: { id: string }) => {
  const { id } = params
  const { data, error } = useSWR([`${address}/${id}`], fetcher, {shouldRetryOnError: false})
  return {
    activity: data,
    isLoading: !error && !data,
    isError: error,
  }
}