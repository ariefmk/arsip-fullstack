import Arsip from '@/components/arsip'
import { api } from '@/config'
export const revalidate = 0

export default async function ArsipPage() {
  const respon = await fetch(`${api.server}/auth/arsip`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })

  const ambilData = (await respon.json()).data
  return (
    <Arsip
      datalist={ambilData.arsip}
      kategori={ambilData.kategori}
      pengguna={ambilData.pengguna}
    />
  )
}
