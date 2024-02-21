import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
// import Arsip from '@/components/arsip'
import { api, kunci } from '@/config'
import { Tabel } from './components'
export const revalidate = 0

export default async function ArsipPage() {
  const { nik, jabatan, bidang } = jwt.verify(
    cookies().get('hakAkses').value,
    kunci.server
  )
  const myHeaders = {
    API_Key: api.key,
    jabatan,
  }
  if (jabatan === 'Kepala Bidang') {
    myHeaders.bidang = bidang
  }
  /*
  const respon = await fetch(`${api.server}/auth/arsip`, {
    method: 'GET',
    headers: myHeaders,
  })
  const data = await respon.json()
    */
  const pengguna = { nik, jabatan, bidang }
  const respon1 = await fetch(`${api.server}/auth/arsip2`, {
    method: 'GET',
    headers: myHeaders,
  })
  const respon2 = await fetch(`${api.server}/auth/arsip/tambah`, {
    method: 'GET',
    headers: myHeaders,
  })
  const data1 = await respon1.json()
  const data2 = await respon2.json()
  const data = {
    kategori: data2.data?.kategori,
    penyimpanan: data2.data?.penyimpanan,
    arsip: data1.data.arsip
  }

  return <Tabel datalist={data} pengguna={pengguna} />
  /*
  return (
    <Arsip
      datalist={arsip}
      kategori={kategori}
      pengguna={pengguna}
      penyimpanan={penyimpanan}
      nik={nik}
      jabatan={jabatan}
    />
  )*/
}
