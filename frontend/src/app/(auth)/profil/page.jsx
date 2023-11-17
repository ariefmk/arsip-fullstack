import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { api, kunci } from '@/config'
import Profil from '@/components/profil'

export default async function ProfilPage() {
  const pengguna = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const respon = await fetch(
    `${api.server}/auth/pengguna/data/${pengguna.nik}`,
    {
      method: 'GET',
      headers: {
        API_Key: api.key,
      },
    }
  )
  const ambil = await respon.json()

  return <Profil />
}
