import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconX } from '@tabler/icons-react'
import { inputInisial } from '@/lib/class'
import { hurufKapital } from '@/lib/form'
import { skemaKategoriTambah } from '@/lib/skema'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

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
    })
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box max-w-[400px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(tambahKategori)}
        >
          <h1 className='text-center text-2xl font-bold'>
            Tambah Kategori Arsip
          </h1>
          <div className='flex flex-col gap-y-3'>
            <div className={`w-full`}>
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
            <div className='flex justify-between gap-x-3'>
              <div className='w-full'>
                <input
                  className={`${inputInisial} ${
                    errors.kategori
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  type='text'
                  placeholder='Nama Kategori'
                  disabled={bidang ? false : true}
                  {...register('kategori')}
                />
                <Kesalahan errors={errors.kategori?.message} />
              </div>
              <div className='w-[150px]'>
                <input
                  className={`${inputInisial} ${
                    errors.kode
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  type='text'
                  maxLength='3'
                  placeholder='Kode'
                  onInput={hurufKapital}
                  disabled={bidang ? false : true}
                  {...register('kode')}
                />
                <Kesalahan errors={errors.kode?.message} />
              </div>
            </div>
            <div className={`w-full`}>
              <textarea
                className={`${inputInisial} ${
                  errors.keterangan
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } h-[5rem] w-full resize-none`}
                placeholder='Keterangan'
                disabled={bidang ? false : true}
                {...register('keterangan')}
              />
              <Kesalahan errors={errors.keterangan?.message} />
            </div>
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
