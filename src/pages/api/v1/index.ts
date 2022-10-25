import cors from '@/helpers/middleware/cors';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import path from 'path';

let dir = path.join(path.resolve('./') + '/tmp/');

let mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
};

const handler = nc<NextApiRequest, NextApiResponse>();
handler
  .use(cors)
  .get((req, res) => {
    let { bucket: b, file: f } = req.query;
    const file = Array.isArray(f) ? f[0] : f;
    const bucket = Array.isArray(b) ? b[0] : b;
    if (req.method !== 'GET') {
      res.statusCode = 501;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Method not implemented');
    }
    let type = mime[path.extname(file).replace('.', '')] || 'text/plain';
    const uri = `${dir}${bucket}/${file}`;
    console.log(uri);
    let s = fs.createReadStream(uri);
    s.on('open', function () {
      res.setHeader('Content-Type', type);
      s.pipe(res);
    });
    s.on('error', function () {
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 404;
      res.end('Not found');
    });
  });
export default handler;
