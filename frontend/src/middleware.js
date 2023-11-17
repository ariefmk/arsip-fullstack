import * as jose from 'jose'
import { cookies } from 'next/headers'
import { kunci } from '@/config'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  try {
    const secret = new TextEncoder().encode(kunci.server)
    const kuki = req.cookies.get('hakAkses').value
    const { payload } = await jose.jwtVerify(kuki, secret)
  } catch (error) {
    return NextResponse.redirect(new URL('/keluar', req.url))
  }
}

export const config = {
  matcher: ['/(beranda|manajemen.*|riwayat.*|laporan.*|profil)'],
}
