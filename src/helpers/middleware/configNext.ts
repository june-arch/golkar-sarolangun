import { NextApiRequestModify } from '@/controller/admin/interface'
import { ApiResponse } from '@/helpers/interface/apiResponse'
import { NextApiResponse } from 'next'

type ResponseData = ApiResponse<object, string>
export const configNext = {
  onError(
    error,
    req: NextApiRequestModify,
    res: NextApiResponse<ResponseData>
  ) {
    if (error.code == 'LIMIT_FILE_SIZE') {
      res
        .status(400)
        .json({
          error: `Sorry something Happened! ${error.message}`,
          statusCode: 400,
        })
    }
    if (error.code == 'EXTENSION_NOT_SUPPORTED') {
      res
        .status(400)
        .json({
          error: `Sorry something Happened! ${error.message}`,
          statusCode: 400,
        })
    }
    console.log(error)
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${JSON.stringify(error)}` })
  },
  onNoMatch(req: NextApiRequestModify, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
}
