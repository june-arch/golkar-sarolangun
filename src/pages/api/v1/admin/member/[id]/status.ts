import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/admin.interface';
import { editMemberStatus } from '@/controller/member/member.domain';
import { updateStatusMember } from '@/controller/member/member.dto';
import cors from '@/helpers/middleware/cors';
import jwt from '@/helpers/middleware/jwt';
import validate from '@/helpers/middleware/validation';
import * as wrapper from '@/helpers/wrapper';

const handler = nextConnect<NextApiRequestModify, NextApiResponse>();

handler
  .use(cors)
  .use(jwt)
  .patch(
    validate({ body: updateStatusMember }),
    async (req: NextApiRequestModify, res) => {
      const { status } = req.body;
      const { id: i } = req.query;
      const value = Array.isArray(i) ? i[0] : i;
      const id = Number(value) || null;

      const domain = async (status, id) => {
        return editMemberStatus(status, id);
      };

      const sendResponse = async (result) => {
        return result.err
          ? wrapper.response(res, 'failed', result, 'edit status member')
          : wrapper.response(
              res,
              'success',
              result,
              'edit edit status member',
              200
            );
      };
      return sendResponse(await domain(status, id));
    }
  );

export default handler;
