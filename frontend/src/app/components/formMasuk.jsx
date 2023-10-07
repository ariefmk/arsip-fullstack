// Mode klien
'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as yup  from 'yup'
import { IconPasswordUser, IconId, IconLogin } from '@tabler/icons-react'
import { submitData, hanyaAngka, skemaMasuk } from '../lib'


export default function FormMasuk() {
  const [pesanKesalahan, setPesanKesalahan] = useState('')

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(skemaMasuk),
  })

  // Fungsi untuk mengirim data masuk ke server dan mengembalikan nilanya
  const kirimData = async (data, aksi) => {
    const hasil = await submitData(data, aksi)
    if(hasil.status === 200) {
      router.push('/beranda')
    } else if (hasil.status === 400 || hasil.status === 401) {
      setPesanKesalahan(hasil.pesan)
    }

  }

  return (
    <>
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
                onInput={hanyaAngka}
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
              <input className={` form-input border-2 ${errors.kataSandi ? 'border-red-600' :'border-black focus:border-green-500'} outline-none rounded-[10px] h-[2.2rem] md:h-[2.5rem] pl-[2.5rem] pr-[0.5rem] w-[14rem] md:w-[16rem] text-base md:text-xl`}
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
      <div className='h-[24px]'>
        {pesanKesalahan && (
          <p className='text-red-600 font-semibold md:font-bold'>
            {pesanKesalahan}
          </p>
        )}
      </div>
    </>
  )
}
