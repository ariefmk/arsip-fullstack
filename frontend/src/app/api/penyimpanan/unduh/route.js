import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  try {
  const isi = await permintaan.json()
    const respon = await fetch(`${api.server}/auth/penyimpanan/unduh`, {
      method: 'POST',
      headers: {
        API_Key: api.key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(isi)
    })
    return NextResponse.arrayBuffer(new ArrayBuffer('a'))

  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
