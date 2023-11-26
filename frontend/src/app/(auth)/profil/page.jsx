import jwt from 'jsonwebtoken'
import imageSize from 'image-size'
import { cookies } from 'next/headers'
import { api, kunci } from '@/config'
import Profil from '@/components/profil'

export default async function ProfilPage() {
  const pengguna = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const respon = await fetch(
    `${api.server}/auth/profil/${pengguna.nik}`,
    {
      method: 'GET',
      headers: {
        API_Key: api.key,
      },
    }
  )
  const ambil = await respon.json()
  const data = ambil.data

  let gambar = {}
  if (ambil.data.foto) {
    const berkas = new Buffer.from(ambil.data.foto).toString('base64')
    const buffer = Buffer.from(ambil.data.foto)
    const dimensi = imageSize(buffer)
    gambar = {
      media: berkas,
      height: dimensi.height,
      width: dimensi.width,
    }
  }

  const dataPengguna = {...data, gambar}
  return <Profil pengguna={dataPengguna}/>
}
