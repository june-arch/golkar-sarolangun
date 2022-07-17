import { NextApiResponse } from 'next'

export const response = (
  res: NextApiResponse,
  type: string,
  result,
  message = '',
  code: number
) => {
  let status = true
  let data = result.data
  if (type === 'failed') {
    status = false
  }
  return res.status(code).send({
    success: status,
    data,
    message,
    code,
  })
}

export const responsePage = (
  res: NextApiResponse,
  type: string,
  result,
  message = '',
  code = 200
) => {
  let status = true
  let data = result.data
  if (type === 'failed') {
    status = false
  }
  return res.status(code).send({
    success: status,
    data,
    meta: result.meta,
    message,
    code,
  })
}
