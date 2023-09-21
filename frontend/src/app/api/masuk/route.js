import { NextResponse } from 'next/server'

export async function POST (permintaan) {

  const isi = await permintaan.json()
  const api = process.env.API_SERVER
  const respon = await fetch(`${api}/masuk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API_Key': process.env.API_SERVER_KEY
    },
    body: JSON.stringify({
      nik: isi.nik, 
      kataSandi: isi.kataSandi
    })
  })

  const hasil = await respon.json()

  return NextResponse.json(hasil)
}
