import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { kunci } from '@/config'

export async function POST(permintaan) {
  const isi = await permintaan.json()
  const api = process.env.API_SERVER
  const token = jwt.sign(
    {
      nik: isi.nik,
      kataSandi: isi.kataSandi,
    },
    kunci.klien
  )
  try {
    const respon = await fetch(`${api}/masuk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        API_Key: process.env.API_SERVER_KEY,
      },
      body: JSON.stringify({ token }),
    })

    const hasil = await respon.json()
    if (hasil.status === 200) {
      cookies().set('hakAkses', hasil.data.token, { maxAge: 43200 })
    }
    return NextResponse.json(hasil)
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
