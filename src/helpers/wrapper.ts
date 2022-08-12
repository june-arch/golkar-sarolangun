import { NextApiResponse } from 'next';

import BadRequestError from './error/bad_request_error';
import ConflictError from './error/conflict_error';
import ExpectationFailedError from './error/expectation_failed_error';
import ForbiddenError from './error/forbidden_error';
import GatewayTimeoutError from './error/gateway_timeout_error';
import InternalServerError from './error/internal_server_error';
import NotFoundError from './error/not_found_error';
import ServiceUnavailableError from './error/service_unavailable_error';
import UnauthorizedError from './error/unauthorized_error';
import { ERROR as httpError } from './http-status/status_code';

export const data = (data) => ({ err: null, data });

export const dataPagination = (data, meta) => ({ err: null, data, meta });

export const error = (err) => ({ err, data: null });

export const errorData = (data, err) => ({ data: data, err });

export const response = (
  res: NextApiResponse,
  type: string,
  result: any,
  message = '',
  code?: number
) => {
  let status = true;
  let data = result.data;
  if (type === 'failed') {
    const errCode = checkErrorCode(result.err);
    status = false;
    data = result.data || '';
    message = result.err.message || message;
    code = result.err.code || errCode;
    code = errCode;
  }
  return res.status(code).send({
    success: status,
    data,
    message,
    code,
  });
};

export const responsePage = (
  res: NextApiResponse,
  type: string,
  result: any,
  message = '',
  code = 200
) => {
  let status = true;
  let data = result.data;
  if (type === 'failed') {
    status = false;
    data = '';
    message = result.err;
  }
  return res.status(code).send({
    success: status,
    data,
    meta: result.meta,
    message,
    code,
  });
};

const checkErrorCode = (error) => {
  switch (error.constructor) {
    case BadRequestError:
      return httpError.BAD_REQUEST;
    case ConflictError:
      return httpError.CONFLICT;
    case ExpectationFailedError:
      return httpError.EXPECTATION_FAILED;
    case ForbiddenError:
      return httpError.FORBIDDEN;
    case GatewayTimeoutError:
      return httpError.GATEWAY_TIMEOUT;
    case InternalServerError:
      return httpError.INTERNAL_ERROR;
    case NotFoundError:
      return httpError.NOT_FOUND;
    case ServiceUnavailableError:
      return httpError.SERVICE_UNAVAILABLE;
    case UnauthorizedError:
      return httpError.UNAUTHORIZED;
    default:
      return httpError.CONFLICT;
  }
};
