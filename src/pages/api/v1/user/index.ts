import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/interface';
import { findMemberByKTP, registerMember } from '@/controller/member/domain';
import { createMember } from '@/controller/member/dto';
import { configNext } from '@/helpers/middleware/configNext';
import { uploadDiffMiddleware } from '@/helpers/middleware/uploads';
import validate from '@/helpers/middleware/validation';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext);

handler
  .get(async (req: NextApiRequestModify, res: NextApiResponse) => {
    const { nik: n } = req.query;
    const dataNik = Array.isArray(n) ? n[0] : n;
    const nik = Number(dataNik) || 1;
    const domain = async (nik) => {
      return findMemberByKTP(nik);
    };

    const sendResponse = async (result) => {
      return result.err
        ? wrapper.response(res, 'failed', result, 'get status by nik')
        : wrapper.response(res, 'success', result, 'get status by nik', 200);
    };
    return sendResponse(await domain(nik));
  })
  .use(uploadDiffMiddleware('images/users'))
  .post(
    validate({ body: createMember }),
    async (req: NextApiRequestModify, res: NextApiResponse) => {
      const payload = req.body;
      const { files } = req;
      const domain = async (files, payload) => {
        return registerMember(files, payload);
      };

      const sendResponse = async (result) => {
        return result.err
          ? wrapper.response(res, 'failed', result, 'apply kta')
          : wrapper.response(res, 'success', result, 'apply kta', 201);
      };
      return sendResponse(await domain(files, payload));
    }
  );

export default handler;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
