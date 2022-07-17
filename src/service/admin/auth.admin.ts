const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/auth/admin`
const fetcher = (...args: [string, object]) =>
  fetch(...args).then((res) => res.json())

export const postLogin = async (payload: {
  username: string
  password: string
}) => {
  const result = await fetcher(address, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return result
}
