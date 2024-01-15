import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { kunci, api } from '@/config'

export async function POST(permintaan) {
  const data = await permintaan.json()
  const token = jwt.sign(data, kunci.klien)
  try {
    const respon = await fetch(`${api.server}/masuk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify({ token }),
    })

    const hasil = await respon.json()
    if (hasil.status === 200) {
      cookies().set('hakAkses', hasil.data.token, { maxAge: 43200 })
    }
    return NextResponse.json(hasil)
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Gagal terhubung ke server',
    })
  }
}

