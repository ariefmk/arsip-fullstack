import { Menu } from './components'
import jwt from 'jsonwebtoken'
import imageSize from 'image-size'
import { cookies } from 'next/headers'
import { api, kunci } from '@/config'
import { redirect } from 'next/navigation'
export const revalidate = 0

export default async function Layout({ children }) {
  const { nik, hakAkses, bidang, jabatan } = jwt.verify(
    cookies().get('hakAkses').value,
    kunci.server
  )

  const ambil = await fetch(`${api.server}/auth/pengguna/data?nik=${nik}`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const respon = await ambil.json()
  if (respon.status === 200) {
    let gambar = {}
    if (respon.data.foto) {
      const berkas = new Buffer.from(respon.data.foto).toString('base64')
      const buffer = Buffer.from(respon.data.foto)
      const dimensi = imageSize(buffer)
      gambar = {
        media: berkas,
        height: dimensi.height,
        width: dimensi.width,
      }
    }
    const dataPengguna = {
      nama: respon.data.nama,
      nik: respon.data.nik,
      gambar,
    }
    return (
      <div className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black`}>
        <Menu profil={dataPengguna} pengguna={{ hakAkses, jabatan, bidang }} />
        <main className={`h-full mt-[5rem] md:ml-[15rem]`}>{children}</main>
      </div>
    )
  } else {
    redirect('/keluar')
  }
}
