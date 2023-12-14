import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import { skemaPenyimpananTambah } from '@/lib/skema'

export default function Tambah({ referensi, kode }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(skemaPenyimpananTambah()) })

  const tambahPenyimpanan = async (data) => {
    fetch('/api/penyimpanan/tambah', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
      reset()
    })
  }

  useEffect(() => {
    setValue('kode', kode)
  }, [kode, setValue])
  return (
    <dialog className='daisy-modal backdrop-blur-[2px]' ref={referensi}>
      <div className='daisy-modal-box max-w-[400px]'>
        <form
          className={`flex flex-col gap-y-3`}
          onSubmit={handleSubmit(tambahPenyimpanan)}
        >
          <h1 className={`text-center text-2xl font-bold`}>
            Tambah Penyimpanan Arsip
          </h1>
          <div className={`w-full`}>
            <select
              className={`${inputInisial} ${
                errors.bidang
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } w-full`}
              name='bidang'
              {...register('bidang')}
            >
              <option value=''>Bidang</option>
              <option value='1'>Kesra & Pelayanan</option>
              <option value='2'>Pemerintahan</option>
              <option value='3'>Kewilayahan</option>
              <option value='4'>Keuangan</option>
              <option value='5'>Umum & Perencanaan</option>
            </select>
            <Kesalahan errors={errors.bidang?.message} />
          </div>
          <div className={`flex flex-row gap-x-3`}>
            <div className={``}>
              <input
                type='text'
                className={`${inputInisial} w-[100px] border-black read-only:cursor-not-allowed read-only:bg-gray-200`}
                placeholder='Kode'
                disabled={true}
                {...register('kode', {
                  value: kode,
                })}
              />
              <Kesalahan errors={errors.kode?.message} />
            </div>
            <div className={`w-full`}>
              <input
                type='text'
                className={`${inputInisial} ${
                  errors.nama
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                placeholder='Nama'
                {...register('nama')}
              />
              <Kesalahan errors={errors.nama?.message} />
            </div>
          </div>
          <div className={`w-full`}>
            <input
              type='text'
              className={`${inputInisial} ${
                errors.keterangan
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } w-full`}
              placeholder='Keterangan'
              {...register('keterangan')}
            />
            <Kesalahan errors={errors.keterangan?.message} />
          </div>
          <div className={`w-full`}>
            <input
              type='text'
              className={`${inputInisial} ${
                errors.lokasi
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } w-full`}
              placeholder='Informasi Lokasi'
              {...register('lokasi')}
            />
            <Kesalahan errors={errors.lokasi?.message} />
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah />
            <TombolReset onClick={() => {reset()}}/>
          </div>
        </form>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
