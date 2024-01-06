import { NextResponse } from 'next/server'
import { api, kunci } from '@/config'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET(permintaan) {
  try {
    const { bidang } = jwt.verify(cookies().get('hakAkses').value, kunci.server)
    const respon = await fetch(`${api.server}/auth/arsip/ubah`, {
      method: 'GET',
      headers: {
        API_Key: api.key,
        kode: permintaan.headers.get('kode'),
        bidang,
      },
    })

    return NextResponse.json(await respon.json())
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}

export async function PUT(permintaan) {
  try {
    const respon = await fetch(`${api.server}/auth/arsip/ubah`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify(await permintaan.json()),
    })

    return NextResponse.json(await respon.json())
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
