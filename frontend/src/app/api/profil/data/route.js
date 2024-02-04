import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function PUT(permintaan) {
  const kueri = permintaan.nextUrl.searchParams
  const nik = kueri.get('nik')
  try {
    const respon = await fetch(
      `${api.server}/auth/profil/data?nik=${nik}`,
      {
        method: 'PUT',
        headers: {
          API_Key: api.key,
        },
        body: await permintaan.formData(),
      }
    )

    return NextResponse.json(await respon.json())
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
