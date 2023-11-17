import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  const isi = await permintaan.json()
  try {
    const respon = await fetch(`${api.server}/auth/kategori/tambah`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify({
        bidang: isi.bidang,
        kategori: isi.kategori,
        kode: isi.kode,
      }),
    })

    return NextResponse.json(await respon.json())
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
