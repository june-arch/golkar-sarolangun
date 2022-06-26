import nextConnect from 'next-connect'
import {  NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/interface/admin'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs';
import { SignOptions } from '@/interface/jwt';
import prisma from '@/lib/db/connection';
import { findOneAdminById, findOneAdminByUserame } from '@/query/admin';
import { response } from '@/lib/wrapper';
// audience from Blowfish algrithm CTR model https://codebeautify.org/encrypt-decrypt
// pass ask developer

export const generateToken = async (payload, expiresIn='100m') => {
  const privateKey = readFileSync(process.env.PRIVATE_KEY, 'utf8');
    const verifyOptions: SignOptions = {
      algorithm: 'RS256',
      audience: 'PooCBigub8bskokGglBluJw1jZ5S2lo=',
      issuer: 'ngopieDev',
      expiresIn
    };
    const token = jwt.sign(payload, privateKey, verifyOptions);
    return token;
}

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const auth = nextConnect<NextApiRequestModify, NextApiResponse>()
  .use(async (req, res, next) => {
    const publicKey = readFileSync(process.env.PUBLIC_KEY, 'utf8');
    const verifyOptions = {
      algorithm: 'RS256',
      audience: 'PooCBigub8bskokGglBluJw1jZ5S2lo=',
      issuer: 'ngopieDev'
    };
  
    const token = getToken(req.headers);
    if (!token) {
      return response(res, 'failed', {data: null}, 'Unauthorized', 403);
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, publicKey, verifyOptions);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return response(res, 'failed', {data: null}, 'Token Is expired', 401);
      }
      return response(res, 'failed', {data: null}, 'Token Is Invalid', 401);
    }
  
    const sessId = decodedToken.sub;
    const user = await findOneAdminById(sessId);
    if (!user) {
      return response(res, 'failed', {data: null}, 'Unauthorized', 403);
    }
    next();
  })
export default auth