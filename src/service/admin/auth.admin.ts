import { fetcher } from "@/helpers/utils/common"

const domain = process.env.DOMAIN_API
const address = `${domain}/api/v1/auth/admin`

export const postLogin = async (payload: {
  username: string
  password: string
}) => {
  try {
    const result = await fetcher(address, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return result
  } catch (error) {
    return error;
  }
}
