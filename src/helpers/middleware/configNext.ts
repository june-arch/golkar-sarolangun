import { NextApiResponse } from 'next';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { ApiResponse } from '@/helpers/interface/apiResponse';
import * as wrapper from '@/helpers/wrapper';

import BadRequestError from '../error/bad_request_error';
import ForbiddenError from '../error/forbidden_error';
import InternalServerError from '../error/internal_server_error';

type ResponseData = ApiResponse<object, string>;
export const configNext = {
  onError(
    error,
    req: NextApiRequestModify,
    res: NextApiResponse<ResponseData>
  ) {
    if (error.code == 'LIMIT_FILE_SIZE' || error.code == 'EXTENSION_NOT_SUPPORTED') {
      return wrapper.response(res, 'failed', wrapper.error(new BadRequestError(`Sorry something Happened! ${error.message}`)), 'upload file');
    }
    console.log(`Sorry something Happened! ${JSON.stringify(error)}`);
    return wrapper.response(res, 'failed', wrapper.error(new InternalServerError()), 'error');
  },
  onNoMatch(req: NextApiRequestModify, res: NextApiResponse<ResponseData>) {
    return wrapper.response(res, 'failed', wrapper.error(new ForbiddenError(`Method '${req.method}' Not Allowed`)), 'error forbidden');
  },
};
