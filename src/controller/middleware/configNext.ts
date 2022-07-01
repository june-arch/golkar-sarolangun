import { NextApiRequestModify } from '@/controller/interface/admin';
import { ApiResponse } from '@/controller/interface/apiResponse'
import { NextApiResponse } from 'next'

type ResponseData = ApiResponse<object, string>;
export const configNext = {
    onError(error, req: NextApiRequestModify, res: NextApiResponse<ResponseData>) {
        if(error.code == "LIMIT_FILE_SIZE"){
        res.status(400).json({ error: `Sorry something Happened! ${error.message}`, statusCode: 400 });  
        }
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextApiRequestModify, res: NextApiResponse<ResponseData>) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
};