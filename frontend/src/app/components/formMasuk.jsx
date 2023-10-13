// Mode klien
'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { IconPasswordUser, IconId, IconLogin } from '@tabler/icons-react'
import { submitData, hanyaAngka, skemaMasuk } from '../lib'

export default function FormMasuk() {
  const [pesanKesalahan, setPesanKesalahan] = useState('')
  const [tunggu, setTunggu] = useState(false)

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(skemaMasuk),
  })

  // Fungsi untuk mengirim data masuk ke server dan mengembalikan nilanya
  const kirimData = async (data, aksi) => {
    setTunggu(true)
    const hasil = await submitData(data, aksi)
    if (hasil.status === 200) {
      router.push('/beranda')
    } else {
      setPesanKesalahan(hasil.pesan)
      setTunggu(false)
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(kirimData)}>
          <div className='flex flex-col items-center gap-y-[3px]'>
            <div className='relative inline-block'>
              <label className='absolute top-[5px] pl-[.5rem]' htmlFor='nik'>
                <IconId
                  color='#000000'
                  stroke={1.5}
                  className='h-[25px] w-[25px] md:h-[30px] md:w-[30px]'
                />
              </label>
              <input
                className={`h-[2.2rem] w-[14rem] border-2 pl-[2.5rem] pr-[.5rem] md:h-[2.5rem] md:w-[16rem] ${
                  errors.nik
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } rounded-[10px] text-base outline-none md:text-xl`}
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
              {errors.nik?.message && (
                <p className='text-center text-sm text-error md:text-base'>
                  {errors.nik?.message}
                </p>
              )}
            </div>
            <div className='relative inline-block'>
              <label
                className='absolute top-[5px] pl-[0.5rem]'
                htmlFor='kataSandi'
              >
                <IconPasswordUser
                  color='#000000'
                  stroke={1.5}
                  className='h-[25px] w-[25px] md:h-[30px] md:w-[30px]'
                />
              </label>
              <input
                className={`h-[2.2rem] w-[14rem] border-2 pl-[2.5rem] pr-[0.5rem] md:h-[2.5rem] md:w-[16rem] ${
                  errors.kataSandi
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } rounded-[10px] text-base outline-none md:text-xl`}
                type='password'
                id='kataSandi'
                name='kataSandi'
                placeholder='Kata Sandi'
                {...register('kataSandi')}
              ></input>
            </div>
            <div className='h-[20px] md:h-[24px]'>
              {errors.kataSandi?.message && (
                <p className='text-center text-sm text-error md:text-base'>
                  {errors.kataSandi?.message}
                </p>
              )}
            </div>
            <div>
              <button
                className={`flex h-[2.2rem] w-[8rem] flex-row items-center justify-center gap-x-1 rounded-[10px] md:h-[2.5rem] md:w-[10rem] ${
                  errors.nik?.message || errors.kataSandi?.message
                    ? 'bg-error'
                    : 'bg-green-600'
                } text-lg font-bold text-white md:text-xl `}
                type='submit'
                disabled={tunggu}
              >
                {tunggu ? (
                  <span className='daisy-loading daisy-loading-ring daisy-loading-md h-[20px] w-[20px]'></span>
                ) : (
                  <div className='flex flex-row items-center justify-center gap-x-1 '>
                    <p>Masuk</p>
                    <IconLogin
                      color='#ffffff'
                      stroke={2}
                      className='h-[21px] w-[21px] md:h-[23px] md:w-[23px]'
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='h-[24px]'>
        {pesanKesalahan && (
          <p className='text-center font-semibold text-red-600 md:font-bold'>
            {pesanKesalahan}
          </p>
        )}
      </div>
    </div>
  )
}
