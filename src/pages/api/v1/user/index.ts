import nextConnect from 'next-connect'
import jwt from '@/controller/middleware/jwt'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/controller/interface/admin'
import { response } from '@/lib/wrapper'
import logger from '@/lib/logger/pino'
import { create } from '@/controller/query/member'
import { Member } from '@/controller/interface/member'
import { uploadDiffMiddleware } from '@/controller/middleware/uploads'

import validate from "@/controller/middleware/validation";
import { configNext } from '@/controller/middleware/configNext'
import { member } from '@/controller/dto/member.dto'
import Tesseract from 'tesseract.js';
import { readFileSync } from 'fs'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>(configNext)

handler
  .use(uploadDiffMiddleware('images/users'))
  .post(validate({ body: member }), async (req: NextApiRequestModify, res: NextApiResponse) => {
    const { region_id, nik, fullname, address, phone_number, email, place_of_birth, date_of_birth, gender, status } = req.body;
    const { file, files, user } = req;
    const config = {
      lang: "ind",
      oem: 1,
      psm: 3
    }
    const img = readFileSync(files['photo_ktp'][0].destination + '/' + files['photo_ktp'][0].filename);
    const result = await Tesseract.recognize(img,"eng",{ logger: m => console.log(m)});
    console.log(result.data.text);
    // const doc: Member = {
    //   region_id,
    //   nik,
    //   fullname,
    //   address,
    //   phone_number,
    //   email,
    //   place_of_birth,
    //   date_of_birth: new Date(date_of_birth),
    //   gender,
    //   status,
    //   photo: file ? file.filename : '',
    //   created_date: new Date(),
    //   photo_ktp: file ? file.filename : '',
    // };
    // const result = await create(doc)
    response(res, 'success', {data: null}, 'success register member', 201);
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};