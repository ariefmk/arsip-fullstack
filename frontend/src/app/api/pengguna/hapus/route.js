import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  const isi = await permintaan.json()
  try {
    const respon = await fetch(`${api.server}/auth/pengguna/hapus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nik: isi.nik }),
    })
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
