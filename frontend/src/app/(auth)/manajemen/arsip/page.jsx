import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Arsip from '@/components/arsip'
import { api, kunci } from '@/config'
export const revalidate = 0

export default async function ArsipPage() {
  const { nik, jabatan, bidang } = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const myHeaders = {
    API_Key: api.key,
    jabatan,
  }
  if (jabatan === 'Kepala Bidang') {
    myHeaders.bidang = bidang
  }
  const respon = await fetch(`${api.server}/auth/arsip`, {
    method: 'GET',
    headers: myHeaders,
  })
  const { arsip, kategori, pengguna, penyimpanan } = (await respon.json()).data

  return (
    <Arsip
      datalist={arsip}
      kategori={kategori}
      pengguna={pengguna}
      penyimpanan={penyimpanan}
      nik={nik}
      jabatan={jabatan}
    />
  )
}
