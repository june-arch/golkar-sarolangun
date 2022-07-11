import useSWR from "swr";

const domain = process.env.DOMAIN_API;
const address = `${domain}/api/v1/admin/region`;
const fetcher = async (...args: [string, object]) => {
  const res = await fetch(...args)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error['info'] = await res.json()
    error['status'] = res.status
    throw error
  }

  return res.json()
}

export const getRegions = (queries: {page: string, limit: string}, token: string) => {
    const {page, limit} = queries;
    const {data, error} = useSWR([`${address}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
    }], fetcher, {shouldRetryOnError: false});
    return {
        region: data,
        isLoading: !error && !data,
        isError: error
      }
};