import nextConnect from 'next-connect'
import { findOneAdminByUserame, validatePassword } from '@/query/admin'
import { NextApiResponse } from 'next'
import { NextApiRequestModify } from '@/interface/admin'
import { response } from '@/lib/wrapper'
import { Login } from '@/interface/auth'
import logger from '@/lib/logger/pino'
import jwt from 'jsonwebtoken'
import { generateToken } from '@/middleware/jwt'

const handler = nextConnect<NextApiRequestModify, NextApiResponse>()

handler
    .post(async (req, res) => {
        const { username, password } = req.body;
        const admin: Login = {
            username,
            password,
        };
        const result = await findOneAdminByUserame(username);
        if(!result){
            logger.error('not found admin', result);
            response(res, 'failed', { data: null }, 'user not found', 404);    
        }

        if(!validatePassword(result, password)){
            logger.error('password salah');
            response(res, 'failed', { data: null }, 'wrong password', 400);
        }
        const payload = {
            sub: result.id_admin,
            username: result.username,
        };

        const token = await generateToken(payload,'12h');
    
        // return basic user details and token
        const data = {
            id: result.id_admin,
            username: result.username,
            token
        };
        response(res, 'success', { data: data }, 'success login admin', 200);
    })

export default handler