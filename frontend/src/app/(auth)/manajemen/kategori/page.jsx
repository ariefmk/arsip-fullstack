import Kategori from '@/components/kategori'
import { api } from '@/config'
export const revalidate = 0
export default async function KategoriPage() {
  const respon = await fetch(`${api.server}/auth/kategori`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const ambilData = await respon.json()
  return <Kategori datalist={ambilData} />
}
