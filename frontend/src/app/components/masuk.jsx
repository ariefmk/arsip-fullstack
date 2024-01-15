'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  IconUserCircle,
  IconId,
  IconPasswordUser,
  IconLogin,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react'
import { skemaMasuk } from '@/lib/skema'
import { hanyaAngka } from '@/lib/form'

export default function Form() {
  const [pesan, setPesan] = useState('')
  const [tunggu, setTunggu] = useState(false)
  const [lihat, setLihat] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaMasuk),
  })

  const masukHandler = async (data, aksi) => {
    setTunggu(true)
    const kirim = await fetch('/api/masuk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const respon = await kirim.json()
    if (respon.status === 200) {
      router.push('/beranda')
    } else {
      setTunggu(false)
      setPesan(respon.pesan)
    }
  }

  return (
    <div className={`flex flex-col items-center`}>
      <div
        className={`flex h-[16rem] w-[16rem] flex-col items-center items-center justify-evenly gap-y-2 rounded-[2rem] border-2 border-black bg-white md:h-[20rem] md:w-[20rem]`}
      >
        <IconUserCircle
          color='#0362a1'
          stroke={1.2}
          className={`h-[60px] w-[60px] md:h-[80px] md:w-[80px]`}
        />
        <form
          onSubmit={handleSubmit(masukHandler)}
          className={`flex flex-col items-center gap-y-[3px]`}
        >
          <div className={`relative inline-block`}>
            <label className={`absolute top-[5px] pl-[0.5rem]`} htmlFor='nik'>
              <IconId
                stroke={1.5}
                className={`h-[25px] w-[25px] md:h-[30px] md:w-[30px]`}
              />
            </label>
            <input
              className={`h-[2.2rem] w-[14rem] border-2 pl-[2.5rem] pr-[.5rem] placeholder:text-black md:h-[2.5rem] md:w-[16rem] ${
                errors.nik
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } rounded-[10px] text-base outline-none md:text-xl`}
              type='text'
              id='nik'
              name='nik'
              placeholder='NIK'
              inputMode='numeric'
              onInput={hanyaAngka}
              maxLength='16'
              autoComplete='username'
              {...register('nik')}
            />
          </div>
          <div className='h-[20px] md:h-[24px]'>
            {errors.nik?.message && (
              <p className='text-center text-sm text-error md:text-base'>
                {errors.nik?.message}
              </p>
            )}
          </div>
          <div className={`relative inline-block`}>
            <label className={`absolute top-[5px] pl-[0.5rem]`} htmlFor='sandi'>
              <IconPasswordUser
                stroke={1.5}
                className={`h-[25px] w-[25px] md:h-[30px] md:w-[30px]`}
              />
            </label>
            <input
              className={`h-[2.2rem] w-[14rem] border-2 pl-[2.5rem] pr-[2.2rem] placeholder:text-black md:h-[2.5rem] md:w-[16rem] ${
                errors.kataSandi
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } rounded-[10px] text-base outline-none md:text-xl`}
              type={lihat ? 'text' : 'password'}
              id='kataSandi'
              name='kataSandi'
              placeholder='Kata Sandi'
              autoComplete='current-password'
              {...register('kataSandi')}
            />
            <div
              className='absolute right-[5px] top-[5px] cursor-pointer'
              onClick={() => setLihat(!lihat)}
            >
              {lihat ? (
                <IconEye
                  stroke={1.5}
                  className={`h-[25px] w-[25px] md:h-[30px] md:w-[30px]`}
                />
              ) : (
                <IconEyeOff
                  stroke={1.5}
                  className={`h-[25px] w-[25px] md:h-[30px] md:w-[30px]`}
                />
              )}
            </div>
          </div>
          <div className='h-[20px] md:h-[24px]'>
            {errors.kataSandi?.message && (
              <p className='text-center text-sm text-error md:text-base'>
                {errors.kataSandi?.message}
              </p>
            )}
          </div>
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
              <span className='daisy-loading daisy-loading-spinner daisy-loading-md h-[20px] w-[20px] text-white'></span>
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
          <div className='flex h-[24px] items-center justify-center'>
            {pesan && (
              <p className='text-center text-xs font-semibold text-red-600 md:font-bold'>
                {pesan}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
