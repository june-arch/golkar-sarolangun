// middleware.ts

import type { NextRequest, NextResponse } from 'next/server'
import { areCredentialsValid } from '../lib'

export function middleware(req: NextRequest) {
  if (areCredentialsValid(req.headers.get('authorization'))) {
    return NextResponse.next()
  }
  return NextResponse.redirect(
    new URL(`/login?from=${req.nextUrl.pathname}`, req.url)
  )
}