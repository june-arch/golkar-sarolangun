import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import NextCors from 'nextjs-cors';

import { NextApiRequestModify } from "@/controller/admin/admin.interface";

const cors = nextConnect<NextApiRequestModify, NextApiResponse>().use(
    async (req, res, next) => {
        await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        next();
    }
  );
  export default cors;