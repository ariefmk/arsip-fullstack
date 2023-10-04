'use client'
import { IconUserCircle, IconPasswordUser, IconId } from '@tabler/icons-react'

export default function Masuk() {
  const kirimData = async (aksi) => {
    aksi.preventDefault()
    const inputan = {
      nik: aksi.target[0].value,
      kataSandi: aksi.target[1].value
    }

    const respon = await fetch(`/api/masuk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputan)
    })

    const hasil = await respon.json()
    console.log(hasil)
  }

  return (
    <main>
      <div className='login-container flex flex-col'>
        <div className='login-title'>
          <h1 className='text-2xl text-center'>
            APLIKASI ARSIP DESA MAMPARI
          </h1>
        </div>
        <div className='login-form-container border-1'>
          <div className=''>
            <IconUserCircle
              size={60}
              color='#0362a1'
              strike={2}
            />
          </div>
          <div className='login-form'>
            <form>
              <div className='flex flex-col gap-y-2' >
                <div className='relative inline-block'>
                  <label className='nik-label absolute top-[5px] pl-[.5rem]' htmlFor='nik'>
                    <IconId
                      size={30}
                      strike={1}
                    />
                  </label>
                  <input className='border rounded-full h-[2.5rem] pl-[2.5rem] w-[14rem]' type='text' id='nik' name='nik' placeholder='NIK'></input>
                </div>
                <div className='relative inline-block'>
                  <label className='kataSandi-label absolute top-[5px] pl-[.5rem]' htmlFor='kataSandi'>
                    <IconPasswordUser
                      size={30}
                      strike={1}
                    />
                  </label>
                  <input className='border rounded-[20px] h-[2.5rem] pl-[2.5rem] w-[14rem]' type='password' id='kataSandi' name='kataSandi' placeholder='Kata Sandi'></input>
                </div>
                <div className='login-submit'>
                  <button className='rounded-full bg-green text-white text-lg text-xl font-bold h-10 w-20' type='submit'>Masuk</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
