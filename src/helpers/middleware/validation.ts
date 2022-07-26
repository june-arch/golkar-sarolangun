import withJoi from 'next-joi'
import * as wrapper from '@/helpers/wrapper'
import BadRequestError from '../error/bad_request_error'

export default withJoi({
  onValidationError: (_, res, error) => {
    if (error) {
      const errData = error.details.map((err) => {
        const data = {}
        data[err.context.key] = err.message
        return data
      })
      return wrapper.response(res, 'failed', wrapper.errorData(errData, new BadRequestError()))
    }
  },
})
