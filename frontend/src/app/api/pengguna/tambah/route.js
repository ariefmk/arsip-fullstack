import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  try {
    const respon = await fetch(`${api.server}/auth/pengguna/tambah`, {
      method: 'POST',
      headers: {
        API_Key: api.key,
      },
      body: await permintaan.formData(),
    })
    return NextResponse.json({
      status: 200,
      pesan: 'Data berhasil ditambahkan',
    })
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
