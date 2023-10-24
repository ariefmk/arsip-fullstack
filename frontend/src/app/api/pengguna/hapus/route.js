import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function DELETE(permintaan) {
  const isi = await permintaan.json()
  try {
    const respon = await fetch(`${api.server}/auth/pengguna/hapus`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify({ nik: isi.nik }),
    })
    return NextResponse.json(await respon.json())
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
