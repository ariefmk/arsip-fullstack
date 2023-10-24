import Pengguna from '@/components/pengguna'
import { api } from '@/config'
export const revalidate = 0


export default async function PenggunaPage() {
  const respon = await fetch(`${api.server}/auth/pengguna`, {
    method: 'GET',
    headers: {
      API_Key: api.key
    }
  })

  const ambilData = await respon.json()
  return (
    <div>
      <Pengguna datalist={ambilData}/>
    </div>
  )
}
