import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function PUT(permintaan) {
  try {
    const respon = await fetch(`${api.server}/auth/penyimpanan/ubah`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify(await permintaan.json()),
    })

    return NextResponse.json({
      status: 200,
      pesan: 'Data berhasil diubah',
    })
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
