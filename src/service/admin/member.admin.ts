import useSWR from "swr";

const domain = process.env.DOMAIN_API;
const address = `${domain}/api/v1/admin/member`;
const fetcher = (...args: [string, object]) => fetch(...args).then((res) => res.json());

export const getMembers = (queries: {page: string, limit: string}, token: string) => {
    const {page, limit} = queries;
    const {data, error} = useSWR([`${address}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
    }], fetcher);
    return {
        member: data,
        isLoading: !error && !data,
        isError: error
      }
};