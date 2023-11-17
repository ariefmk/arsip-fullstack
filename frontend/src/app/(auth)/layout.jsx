import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import jwt from 'jsonwebtoken'
import imageSize from 'image-size'
import { createReadStream } from 'fs'
import { cookies } from 'next/headers'
import { api, kunci } from '@/config'
export const revalidate = 0

export default async function Layout({ children }) {
  const pengguna = jwt.verify(cookies().get('hakAkses').value, kunci.server)

  const respon = await fetch(
    `${api.server}/auth/pengguna/data/${pengguna.nik}`,
    {
      method: 'GET',
      headers: {
        API_Key: api.key,
      },
    }
  )
  const ambil = await respon.json()
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
  const dataPengguna = {
    nama: ambil.data.nama,
    nik: ambil.data.nik,
    gambar,
  }
  return (
    <>
      <Header pengguna={dataPengguna} />
      <div className=''>
        <Sidebar akses={pengguna.hakAkses} />
        <main className='md:ml-[15rem]'>{children}</main>
      </div>
    </>
  )
}
