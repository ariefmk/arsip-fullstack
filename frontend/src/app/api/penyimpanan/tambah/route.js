import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  try {
    const respon = await fetch(`${api.server}/auth/penyimpanan/tambah`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify(await permintaan.json()),
    })

    return NextResponse.json(await respon.json())
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
