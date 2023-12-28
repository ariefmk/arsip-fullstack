// import Laporan from '@/components/laporan'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import Form from './form'
import { api, kunci } from '@/config'
export const revalidate = 0
export default async function LaporanPage() {
  const { jabatan } = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const respon = await fetch(`${api.server}/auth/laporan`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })

  const data = (await respon.json()).data
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <div className={`my-5`}>
        <h1 className={`text-3xl font-bold`}>Buat Laporan Arsip</h1>
      </div>
      <Form data={data.kategori} jabatan={jabatan} />
    </div>
  )
}
