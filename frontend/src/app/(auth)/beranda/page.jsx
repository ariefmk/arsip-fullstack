import D3Test from './components/d3Test'
import BlokData from './components/blokData'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { kunci } from '@/config'

export default function Beranda() {
  const akses = cookies().get('hakAkses')
  if (akses !== undefined) {
    const hakAkses = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  } else {
    console.log('Tidak ada akses')
  }

  return (
    <>
      <div>
        <BlokData judul={'Test'} jumlah={10} />
      </div>
    </>
  )
}
