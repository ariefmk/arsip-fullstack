import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { api, kunci } from '@/config'
import { cookies } from 'next/headers'

export async function PUT(permintaan) {
  const pengguna = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  try {
    fetch(`${api.server}/auth/arsip/setujui`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        API_Key: api.key,
      },
      body: JSON.stringify({
        ...(await permintaan.json()),
        persetujuan: {
          nik: pengguna.nik,
          nama: pengguna.nama,
          jabatan: pengguna.jabatan,
        },
      }),
    })
    return NextResponse.json({
      status: 200,
      pesan: 'Arsip berhasil disetujui',
    })
  } catch {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
