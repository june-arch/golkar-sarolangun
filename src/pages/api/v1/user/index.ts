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
import Tesseract, { createWorker } from 'tesseract.js';
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
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const ocr = await worker.recognize(img);
    await worker.terminate();
    const regex = new RegExp(`${nik}$`,'m');
    if (!(ocr.data && regex.test(ocr.data.text))) {
      response(res, 'failed', {data: null}, 'failed photo ktp tidak sesuai', 400);
    }

    const doc: Member = {
      region_id: Number(region_id),
      nik,
      fullname,
      address,
      phone_number,
      email,
      place_of_birth,
      date_of_birth: new Date(date_of_birth),
      gender,
      status: Number(status),
      photo: files ? files['photo'][0].filename : '',
      created_date: new Date(),
      photo_ktp: files ? files['photo_ktp'][0].filename : '',
    };
    const result = await create(doc)
    response(res, 'success', {data: null}, 'success register member', 201);
  })

export default handler
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};