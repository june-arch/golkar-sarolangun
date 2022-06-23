/* eslint-disable @next/next/no-server-import-in-page */
import { jwtVerify, SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

import { JWT_SECRET_KEY, USER_TOKEN } from './constants'
import { jsonResponse } from './utils'

interface UserJwtPayload {
  jti: string
  iat: number
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get(USER_TOKEN)

  if (!token) {
    return jsonResponse(401, { error: { message: 'Missing user token' } })
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    )
    return verified.payload as UserJwtPayload
  } catch (err) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' } })
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(
  request: NextRequest,
  response: NextResponse
) {
  const cookie = request.cookies.get(USER_TOKEN)

  if (!cookie) {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET_KEY))
    response.cookies.set(USER_TOKEN, token, { httpOnly: true })
  }

  return response
}