import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function GET(permintaan) {
  const kueri = permintaan.nextUrl.searchParams
  const nik = kueri.get('nik')
  try {
    const ambil = await fetch(`${api.server}/auth/pengguna/lihat?nik=${nik}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return NextResponse.json(await ambil.json())
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
