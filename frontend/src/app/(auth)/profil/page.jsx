import jwt from 'jsonwebtoken'
import Image from 'next/image'
import imageSize from 'image-size'
import { cookies } from 'next/headers'
import {IconUserCircle} from '@tabler/icons-react'
import { api, kunci } from '@/config'
import { Profil, Sandi } from './components'

export default async function ProfilPage() {
  const pengguna = jwt.verify(cookies().get('hakAkses').value, kunci.server)
  const respon = await fetch(`${api.server}/auth/profil/${pengguna.nik}`, {
    method: 'GET',
    headers: {
      API_Key: api.key,
    },
  })
  const ambil = await respon.json()
  const data = ambil.data

  let gambar = {}
  if (ambil.data.foto) {
    const berkas = new Buffer.from(ambil.data.foto).toString('base64')
    const buffer = Buffer.from(ambil.data.foto)
    const dimensi = imageSize(buffer)
    gambar = {
      media: berkas,
      height: dimensi.height,
      width: dimensi.width,
    }
  }

  const dataPengguna = { ...data, gambar }
  return (
    <div className={`grid grid-cols-1 place-items-center gap-4`}>
      <div
        className={`daisy-skeleton col-span-1 mt-[50px] h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-100`}
      >
        {/*Gambar Profil*/}
        {JSON.stringify(gambar) !== '{}'? (
          <Image
            src={`data:image/*;base64,${gambar.media}`}
            alt='Gambar profil'
            width={gambar.width}
            height={gambar.height}
            className={`rounded-full`}
          />):(
            <IconUserCircle
              color='#0362a1'
              stroke={1.2}
              className={`h-full w-full`}
            />
          )}
      </div>
      <div className={`w-[600px] col-span-1 daisy-skeleton`}>
        <Profil/>
      </div>
      <div className={`daisy-skeleton col-span-1`}>
        <Sandi/>
      </div>
    </div>
  )
}
