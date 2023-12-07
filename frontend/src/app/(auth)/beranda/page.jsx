import D3Test from './components/d3Test'
import BlokData from './components/blokData'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { kunci, api } from '@/config'
import Beranda from '@/components/beranda'
export const revalidate = 0

export default async function BerandaPage() {
  const akses = jwt.verify(cookies().get('hakAkses').value, kunci.server)

  const respon = await fetch(`${api.server}/auth/`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })

  const data = (await respon.json()).data
  return <Beranda pengguna={akses} data={data.jumlah} grafik={data.grafik} />
}
