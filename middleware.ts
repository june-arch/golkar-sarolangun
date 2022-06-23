/* eslint-disable @next/next/no-server-import-in-page */
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

import { verifyAuth } from '@/lib/auth'
import { jsonResponse } from '@/lib/utils'

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  console.log('masuk ni middleware')
  const url = req.nextUrl
  // Parse the cookie
  const isInBeta = JSON.parse(req.cookies.get('beta') || 'false')

  // Update url pathname
  req.nextUrl.pathname = `/${isInBeta ? 'beta' : 'non-beta'}`

  if (url.searchParams.has('edge')) {
    const resOrPayload = await verifyAuth(req)

    return resOrPayload instanceof Response
      ? resOrPayload
      : jsonResponse(200, { nanoid: nanoid(), jwtID: resOrPayload.jti })
  }

  // Rewrite to url
  return NextResponse.rewrite(req.nextUrl)
}