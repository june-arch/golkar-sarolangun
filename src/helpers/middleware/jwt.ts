import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { NextApiRequestModify } from '@/controller/admin/interface';
import { findOneById } from '@/controller/admin/query';
import { SignOptions } from '@/helpers/interface/jwt';
import * as wrapper from '@/helpers/wrapper';

import ForbiddenError from '../error/forbidden_error';
import UnauthorizedError from '../error/unauthorized_error';
// audience from Blowfish algrithm CTR model https://codebeautify.org/encrypt-decrypt
// pass ask developer

export const generateToken = async (payload, expiresIn = '100m') => {
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
  const verifyOptions: SignOptions = {
    algorithm: 'RS256',
    audience: 'PooCBigub8bskokGglBluJw1jZ5S2lo=',
    issuer: 'ngopieDev',
    expiresIn,
  };
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (
    headers &&
    headers.authorization &&
    headers.authorization.includes('Bearer')
  ) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const auth = nextConnect<NextApiRequestModify, NextApiResponse>().use(
  async (req, res, next) => {
    const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
    const verifyOptions = {
      algorithm: 'RS256',
      audience: 'PooCBigub8bskokGglBluJw1jZ5S2lo=',
      issuer: 'ngopieDev',
    };
    const token = getToken(req.headers);
    if (!token) {
      return wrapper.response(
        res,
        'failed',
        wrapper.error(new UnauthorizedError('Unauthorized'))
      );
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, publicKey, verifyOptions);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return wrapper.response(
          res,
          'failed',
          wrapper.error(new ForbiddenError('Access token expired!'))
        );
      }
      return wrapper.response(
        res,
        'failed',
        wrapper.error(new ForbiddenError('Token is invalid!'))
      );
    }
    const sessId = decodedToken.sub;
    const user = await findOneById(sessId);
    if (user['err'] || user['data'].lenth == 0) {
      return wrapper.response(
        res,
        'failed',
        wrapper.error(new UnauthorizedError('Unauthorized'))
      );
    }
    req.user = user['data'][0];
    next();
  }
);
export default auth;
