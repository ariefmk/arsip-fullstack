import { NextResponse } from 'next/server'
import { api, kunci } from '@/config'

export async function GET(permintaan) {
  const kueri = permintaan.nextUrl.searchParams
  const kode = kueri.get('kode')
  try {
    const respon  = await fetch(`${api.server}/auth/arsip/rincian?kode=${kode}`, {
      method: 'GET',
      headers: {
        API_Key: api.key
      }
    })
    return NextResponse.json(await respon.json())
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal'
    })
  }
}
