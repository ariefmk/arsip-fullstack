'use client'
import Image from 'next/image'
import balangan from './static/balangan.png'
import { IconUserCircle, IconPasswordUser, IconId, IconLogin } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import * as yup  from 'yup'

const skemaMasuk = yup.object({
  nik: yup.string().required('NIK wajib diisi').matches(/^\d+$/, 'NIK hanya mengandung angka').min(16, 'Panjang NIK harus 16 karakter'),
  kataSandi: yup.string().required('Kata Sandi wajib diisi').min(8, 'Kata sandi minimal 8 karakter')
})

export default function Masuk() {
  const [panjangNik, setPanjangNik] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaMasuk),
  })

  const kirimData = async (data, aksi) => {
    const inputan = {
      nik: data.nik,
      kataSandi: data.kataSandi
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

  const inputNikHanyaAngka = (aksi) => {
    const masukkan = aksi.target.value
    const hanyaAngka = masukkan.replace(/[^[0-9]/g, '')

    if (masukkan !== hanyaAngka) {
      aksi.target.value = hanyaAngka
    }
  }

  return (
    <main className=''>
      <div className='login-container flex flex-col pt-[1rem] md:pt-[6rem] gap-y-[.5rem] md:gap-y-[1.5rem]'>
        <div className='flex flex-col items-center gap-y-2'>
          <div className='login-logo'>
            <Image
              src={balangan}
              alt='Balangan'
              className='logo-container w-[60px] h-[60px] md:w-[150px] md:h-[150px]'
            />
          </div>
          <div className='login-title'>
            <h1 className='text-lg md:text-3xl font-bold text-center'>
              APLIKASI ARSIP KANTOR DESA MAMPARI
            </h1>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='login-form-container bg-white flex flex-col items-center self-center justify-evenly rounded-[2rem] border-2 border-black w-[16rem] md:w-[20rem] h-[16rem] md:h-[18rem]'>
            <div className='' >
              <IconUserCircle
                color='#0362a1'
                stroke={1.2}
                className='w-[60px] h-[60px] md:w-[80px] md:h-[80px]'
              />
            </div>
            <div className='login-form'>
              <form
                onSubmit={handleSubmit(kirimData)}
              >
                <div className='flex flex-col gap-y-[3px] items-center' >
                  <div className='relative inline-block'>
                    <label className='nik-label absolute top-[5px] pl-[.5rem]' htmlFor='nik'>
                      <IconId
                        color='#000000'
                        stroke={1.5}
                        className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                      />
                    </label>
                    <input className={`border-2 ${errors.nik? 'border-red-600' : 'border-black focus:border-green-500'} outline-none  rounded-[10px] h-[2.2rem] md:h-[2.5rem] pl-[2.5rem] pr-[.5rem] w-[14rem] md:w-[16rem] text-base md:text-xl`}
                      type='text'
                      id='nik'
                      name='nik' 
                      placeholder='NIK'
                      {...register('nik')}
                      inputMode='numeric'
                      onInput={inputNikHanyaAngka}
                    ></input>
                  </div>
                  <div className='h-[20px] md:h-[24px]'>
                    {errors.nik?.message && <p className='text-center text-sm md:text-base text-red-600 m-0'>{errors.nik?.message}</p>}
                  </div>
                  <div className='relative inline-block'>
                    <label className='kataSandi-label absolute top-[5px] pl-[.5rem]' htmlFor='kataSandi'>
                      <IconPasswordUser
                        color='#000000'
                        stroke={1.5}
                        className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]'
                      />
                    </label>
                    <input className={`border-2 ${errors.kataSandi ? 'border-red-600' :'border-black focus:border-green-500'} outline-none rounded-[10px] h-[2.2rem] md:h-[2.5rem] pl-[2.5rem] pr-[0.5rem] w-[14rem] md:w-[16rem] text-base md:text-xl`}
                      type='password'
                      id='kataSandi'
                      name='kataSandi'
                      placeholder='Kata Sandi'
                      {...register('kataSandi')}
                    ></input>
                  </div>
                  <div className='h-[20px] md:h-[24px]'>
                    {errors.kataSandi?.message && <p className='text-center text-sm md:text-base text-red-600'>{errors.kataSandi?.message}</p>}
                  </div>
                  <div className='login-submit'>
                    <button className={`flex flex-row justify-center items-center gap-x-1 rounded-[10px] ${errors.nik?.message || errors.kataSandi?.message? 'bg-red-600':'bg-green-600'} text-white text-lg md:text-xl font-bold h-[2.2rem] md:h-[2.5rem] w-[8rem] md:w-[10rem] disabled:bg-sky-300`}
                      type='submit'
                    >
                      <p>
                        Masuk
                      </p>
                      <IconLogin
                        color='#ffffff'
                        stroke={2}
                        className='w-[21px] h-[21px] md:w-[23px] md:h-[23px]'
                      />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
