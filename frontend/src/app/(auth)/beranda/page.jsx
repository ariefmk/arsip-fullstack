// import D3Test from './components/d3Test'
// import BlokData from './components/blokData'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { kunci, api } from '@/config'
import { Kartu, Arsip } from './components'
export const revalidate = 0

export default async function Page() {
  const { nama, hakAkses } = jwt.verify(
    cookies().get('hakAkses').value,
    kunci.server
  )

  const ambil = await fetch(`${api.server}/auth/`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })

  const respon = (await ambil.json())
  const jumlah = respon.data.jumlah
  const grafik = respon.data.grafik

  return (
    <div className={`flex items-center justify-center`}>
      <div className={`flex flex-col items-center justify-center text-center`}>
        <h1 className={`mb-4 mt-10 text-3xl`}>Selamat Datang, {nama}!</h1>
        {hakAkses === 'Admin' && (
          <div className={`grid auto-cols-max gap-4`}>
            <Kartu judul='Jumlah Pengguna' nilai={jumlah.pengguna} />
          </div>
        )}
        {hakAkses === 'Standar' && (
          <div className={`grid auto-cols-max grid-cols-2 gap-4`}>
            <Arsip
              jumlah={jumlah.arsip}
              grafik={grafik.arsip}
            />
            <Kartu
              judul='Kategori' nilai={jumlah.kategori}/>
          </div>
        )}
      </div>
    </div>
  )
}

