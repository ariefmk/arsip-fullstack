import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const tambahPenyimpanan = async (data) => {
    fetch('api/penyimpnan/tambah', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
    })
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
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
              className={`${inputInisial} w-full`}
              name='bidang'
              {...register('bidang')}
            >
              <option value=''>Bidang</option>
              <option value='kesra'>Kesra & Pelayanan</option>
              <option value='pemerintahan'>Pemerintahan</option>
              <option value='kewilayahan'>Kewilayahan</option>
              <option value='keuangan'>Keuangan</option>
              <option value='umum'>Umum & Perencanaan</option>
            </select>
            <Kesalahan errors={errors.bidang?.message} />
          </div>
          <div className={`flex flex-row gap-x-3`}>
            <div className={``}>
              <input
                type='text'
                className={`${inputInisial} w-[100px]`}
                placeholder='Kode'
                {...register('kode')}
              />
              <Kesalahan errors={errors.kode?.message} />
            </div>
            <div className={`w-full`}>
              <input
                type='text'
                className={`${inputInisial} w-full`}
                placeholder='Keterangan'
                {...register('keterangan')}
              />
              <Kesalahan errors={errors.keterangan?.message} />
            </div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah />
            <TombolReset />
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
