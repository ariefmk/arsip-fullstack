import { NextResponse } from 'next/server'
import { api } from '@/config'
export async function PUT(permintaan, { params }) {
  try {
    const respon = await fetch(
      `${api.server}/auth/profil/${params.jenis}/${params.nik}`,
      {
        method: 'PUT',
        headers: {
          API_Key: api.key,
        },
        body: await permintaan.formData(),
      }
    )

   // console.log(await respon.json())
    return NextResponse.json(await respon.json())
  } catch (err) {
    return NextResponse.json({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
