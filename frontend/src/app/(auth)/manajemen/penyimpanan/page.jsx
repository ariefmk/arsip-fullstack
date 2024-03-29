import { Tabel } from './components'
//import Penyimpanan from '@/components/penyimpanan'
import { api } from '@/config'
export const revalidate = 0

export default async function PenyimpananPage() {
  const respon = await fetch(`${api.server}/auth/penyimpanan`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const { penyimpanan, kode } = (await respon.json()).data
  //return <Penyimpanan kode={ambilData.kode} datalist={ambilData.penyimpanan}/>
  return <Tabel datalist={penyimpanan} kode={kode} />
}
