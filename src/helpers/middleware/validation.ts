import withJoi from 'next-joi'
import * as wrapper from '@/helpers/wrapper'

export default withJoi({
  onValidationError: (_, res, error) => {
    if (error) {
      const errData = error.details.map((err) => {
        const data = {}
        data[err.context.key] = err.message
        return data
      })
      return wrapper.response(res, 'failed', { data: errData }, 'bad request', 400)
    }
  },
})
