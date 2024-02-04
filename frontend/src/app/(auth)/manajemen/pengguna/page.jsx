import Pengguna from '@/components/pengguna'
import { api } from '@/config'
import { Tabel } from './components'
export const revalidate = 0

export default async function Page() {
  const ambil = await fetch(`${api.server}/auth/pengguna`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const respon = await ambil.json()
  const {datalist} = respon

  return <Tabel datalist={datalist} />
}

/*
export default async function PenggunaPage() {
  const respon = await fetch(`${api.server}/auth/pengguna`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })

  const ambilData = await respon.json()
  return (
    <div>
      <Pengguna datalist={ambilData} />
    </div>
  )
}*/
