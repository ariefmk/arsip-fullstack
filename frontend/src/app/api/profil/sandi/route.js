import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function PUT(permintaan) {
  const kueri = permintaan.nextUrl.searchParams
  const nik = kueri.get('nik')
  try {
    const kirim = await fetch(
    `${api.server}/auth/profil/sandi?nik=${nik}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify(await permintaan.json()),
    })

    return NextResponse.json(await kirim.json())
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
