import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { hurufKapital } from '@/lib/form'
import { skemaKategoriTambah } from '@/lib/skema'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import Input from '@/lib/form/input'

export default function Tambah({ referensi }) {
  const router = useRouter()
  const [bidang, setBidang] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(skemaKategoriTambah()),
  })

  const resetHandler = (aksi) => {
    reset()
    setBidang('')
  }
  const tambahKategori = async (data) => {
    // console.log(data)
    switch (data.bidang) {
      case 'kesra':
        data.bidang = 1
        break
      case 'pemerintahan':
        data.bidang = 2
        break
      case 'kewilayahan':
        data.bidang = 3
        break
      case 'keuangan':
        data.bidang = 4
        break
      case 'umum':
        data.bidang = 5
        break
      default:
        data.bidang = null
    }
    fetch('/api/kategori/tambah', {
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

  return (
    <dialog className='daisy-modal backdrop-blur-[2px]' ref={referensi}>
      <div className='daisy-modal-box max-w-[400px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(tambahKategori)}
        >
          <h1 className='text-center text-2xl font-bold'>
            Tambah Kategori Arsip
          </h1>
          <div className='grid grid-cols-8 gap-3'>
            <div className={`col-span-8`}>
              <select
                className={`${inputInisial} ${
                  errors.bidang
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                name='bidang'
                {...register('bidang')}
                onClick={() => setBidang(getValues('bidang'))}
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
            <Input
              divClass={`col-span-3`}
              type='text'
              name='kode'
              maxLength='3'
              placeholder='Kode Kategori'
              onInput={hurufKapital}
              disabled={bidang ? false : true}
              register={register('kode')}
              errors={errors.kode}
              label={true}
            />
            <Input
              divClass={`col-span-5`}
              type='text'
              name='kategori'
              placeholder='Nama Kategori'
              disabled={bidang ? false : true}
              register={register('kategori')}
              errors={errors.kategori}
              label={true}
            />
            <Input
              divClass={`col-span-8`}
              type='text'
              name='keterangan'
              placeholder='Keterangan'
              disabled={bidang ? false : true}
              register={register('keterangan')}
              errors={errors.keterangan}
              label={true}
            />
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah disabled={bidang ? false : true} />
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
        onClick={() => {
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
