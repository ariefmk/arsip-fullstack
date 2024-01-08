import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import { skemaPenyimpananTambah } from '@/lib/skema'
import Input from '@/lib/form/input'

export default function Ubah({ referensi, data }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    setValue('bidang', data.bidang)
    setValue('kode', data.kode)
    setValue('penyimpanan', data.nama)
    setValue('keterangan', data.keterangan)
    setValue('lokasi', data.lokasi)
  }, [setValue, data])
  const ubahPenyimpanan = async (dataUbah) => {
    console.log(dataUbah)
    const formData = new FormData()
    formData.append('kode', dataUbah.kode)
    formData.append('nama', dataUbah.penyimpanan)
    formData.append('keterangan', dataUbah.keterangan)
    formData.append('lokasi', dataUbah.lokasi)
    dataUbah = {
      kode: dataUbah.kode,
      nama: dataUbah.nama,
      keterangan: dataUbah.keterangan,
      lokasi: dataUbah.lokasi,
    }
    fetch('/api/penyimpanan/ubah', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUbah),
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
    })
  }

  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[400px]`}>
        <form
          className={`flex flex-col gap-y-3`}
          onSubmit={handleSubmit(ubahPenyimpanan)}
        >
          <h1 className={`text-center text-2xl font-bold`}>
            Ubah Penyimpanan Arsip
          </h1>
          <div className={`grid grid-cols-8 gap-3`}>
            <Input
              divClass={`col-span-8`}
              type='text'
              name='bidang'
              placeholder='Bidang'
              disabled={true}
              register={register('bidang')}
              label={true}
            />
            <Input
              divClass={`col-span-4`}
              type='text'
              name='kode'
              placeholder='Kode Penyimpanan'
              disabled={true}
              register={register('kode')}
              errors={errors.kode}
              label={true}
            />
            <Input
              divClass={`col-span-4`}
              type='text'
              name='kode'
              placeholder='Nama Penyimpanan'
              disabled={false}
              register={register('penyimpanan')}
              errors={errors.kode}
              label={true}
            />
            <Input
              divClass={`col-span-8`}
              type='text'
              name='kode'
              placeholder='Keterangan'
              disabled={false}
              register={register('keterangan')}
              errors={errors.kode}
              label={true}
            />
            <Input
              divClass={`col-span-8`}
              type='text'
              name='kode'
              placeholder='Lokasi Penyimpanan'
              disabled={false}
              register={register('lokasi')}
              errors={errors.kode}
              label={true}
            />
          </div>
          {/*
          <div className={`w-full`}>
            <input
              type='text'
              className={`${inputInisial} ${
                errors.bidang
                  ? 'border-error'
                  : 'border-black focus:border-green-500'
              } w-full`}
              name='bidang'
              disabled={true}
              placeholder='Bidang'
              {...register('bidang')}
            />
            <Kesalahan errors={errors.bidang?.message} />
          </div>
          <div className={`flex flex-row gap-x-3`}>
            <div className={``}>
              <input
                type='text'
                className={`${inputInisial} w-[100px] border-black read-only:cursor-not-allowed read-only:bg-gray-200`}
                placeholder='Kode'
                disabled={true}
                {...register('kode', {})}
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
          */}
          <div className='flex justify-center gap-x-4'>
            <TombolSimpan />
            <TombolReset
              onClick={() => {
                reset()
              }}
            />
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
