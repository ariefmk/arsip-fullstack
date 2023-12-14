import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Arsip from '@/components/arsip'
import { api, kunci } from '@/config'
export const revalidate = 0

export default async function ArsipPage() {
  const { nik } = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const respon = await fetch(`${api.server}/auth/arsip`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const { arsip, kategori, pengguna, penyimpanan } = (await respon.json()).data

  return (
    <Arsip
      datalist={arsip}
      kategori={kategori}
      pengguna={pengguna}
      penyimpanan={penyimpanan}
      nik={nik}
    />
  )
}
