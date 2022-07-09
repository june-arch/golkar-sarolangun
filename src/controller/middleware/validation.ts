import withJoi from "next-joi";
import { response } from '@/lib/wrapper'

export default withJoi({
  onValidationError: (_, res, error) => {

    if(error){
      const errData = error.details.map((err)=>{
        const data={};
        data[err.context.key]=err.message;
        return data;
      });
      return response(res, 'failed', {data: errData}, 'bad request', 400);
    }
  },
});