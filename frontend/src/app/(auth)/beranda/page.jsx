// import D3Test from './components/d3Test'
// import BlokData from './components/blokData'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { kunci, api } from '@/config'
import { Kartu, Arsip } from './components'
import Arsip1 from './components/arsip1'
import Jenis from './components/jenis'
import Bidang from './components/bidang'
export const revalidate = 0

export default async function Page() {
  const { jabatan, bidang, namaBidang, nama, hakAkses } = jwt.verify(
    cookies().get('hakAkses').value,
    kunci.server,
  )

  const myHeaders = {
    API_Key: api.key,
    jabatan,
  }
  if (jabatan === 'Kepala Bidang') {
    myHeaders.bidang = bidang
  }

  const ambil = await fetch(`${api.server}/auth/`, {
    method: 'GET',
    headers: myHeaders,
  })

  const respon = await ambil.json()
  const jumlah = respon.data.jumlah
  const grafik = respon.data.grafik

  return (
    <div className={`grid grid-cols-1`}>
      <div className={`mx-6`}>
        <h1 className={`mb-4 mt-4 text-3xl`}>
          Selamat Datang, {nama} selaku{' '}
          {(jabatan !== undefined &&
            jabatan !== 'Kepala Bidang' &&
            `${jabatan}!`) ||
            (jabatan === undefined && 'Admin!')}{' '}
          {jabatan === 'Kepala Bidang' && `Kepala Urusan ${namaBidang}!`}
        </h1>
        {hakAkses === 'Admin' && (
          <div className={`grid auto-cols-max grid-cols-1 gap-4`}>
            <Kartu judul='Pengguna' nilai={jumlah.pengguna} />
          </div>
        )}
        {hakAkses === 'Standar' && (
          <div className={`grid auto-cols-max grid-cols-3 gap-4`}>
            <hr className={`col-span-3 border-2`} />

            <Arsip jumlah={jumlah.arsip} grafik={grafik.arsip} />
            <Kartu
              judul='Total Kategori'
              nilai={jumlah.kategori + ' Kategori'}
            />
            <Kartu
              judul='Total Penyimpanan'
              nilai={jumlah.penyimpanan + ' Penyimpanan'}
            />
            <hr className={`col-span-3 border-2`} />
            <Arsip1 grafik={grafik.arsip} />
            <Jenis grafik={grafik.jenis} />
            <Bidang grafik={grafik.bidang} />
            <hr className={`col-span-3 border-2`} />
          </div>
        )}
      </div>
    </div>
  )
}
