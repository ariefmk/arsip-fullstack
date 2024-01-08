import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import { skemaPenyimpananTambah } from '@/lib/skema'
import Input from '@/lib/form/input'

export default function Tambah({ referensi, kode }) {
  const router = useRouter()
  const [bidang, setBidang] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
          <div className={`grid grid-cols-12 gap-3`}>
            <div className={`col-span-12`}>
              <select
                className={`${inputInisial} ${
                  errors.bidang
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                name='bidang'
                {...register('bidang', {
                  onChange: () => setBidang(getValues('bidang')),
                })}
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
            <Input
              divClass={`col-span-6`}
              type='text'
              name='kode'
              placeholder='Kode Penyimpanan'
              disabled={true}
              register={register('kode', {
                value: kode,
              })}
              errors={errors.kode}
              label={true}
            />
            <Input
              divClass={`col-span-6`}
              type='text'
              name='penyimpanan'
              placeholder='Nama Penyimpanan'
              disabled={bidang ? false : true}
              register={register('nama')}
              errors={errors.nama}
              label={true}
            />
            <Input
              divClass={`col-span-12`}
              type='text'
              name='keterangan'
              placeholder='Keterangan'
              disabled={bidang ? false : true}
              register={register('keterangan')}
              errors={errors.keterangan}
              label={true}
            />
            <Input
              divClass={`col-span-12`}
              type='text'
              name='lokasi'
              placeholder='Informasi Lokasi Penyimpanan'
              disabled={bidang ? false : true}
              register={register('lokasi')}
              errors={errors.lokasi}
              label={true}
            />
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah />
            <TombolReset
              onClick={() => {
                setBidang('')
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
