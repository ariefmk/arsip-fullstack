import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { IconX } from '@tabler/icons-react'
import { hurufKapital } from '@/lib/form'
import { skemaKategoriTambah } from '@/lib/skema'

export default function Tambah({ referensi }) {
  const [bidang, setBidang] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(skemaKategoriTambah),
  })


  const resetHandler = (aksi) => {
    reset()
    setBidang('')
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box max-w-[400px]'>
        <form className='flex flex-col gap-y-3' onSubmit={handleSubmit()}>
          <h1 className='text-center text-2xl font-bold'>
            Tambah Kategori Arsip
          </h1>
          <div className='flex flex-col gap-y-3'>
            <select
              className={`-px-[5px] h-[2.5rem] rounded-[5px] border-2 border-black bg-white outline-none focus:border-green-500`}
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
            <div className='flex justify-between gap-x-3'>
              <div className='w-full'>
                <input
                  className={`h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.kategori
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  type='text'
                  placeholder='Nama Kategori'
                  {...register('kategori')}
                  disabled={bidang ? false : true}
                />
              </div>
              <div className='w-[100px]'>
                <input
                  className={`h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.kode
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  type='text'
                  maxLength='3'
                  placeholder='Kode'
                  onInput={hurufKapital}
                  {...register('kode')}
                  disabled={bidang ? false : true}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <button
              type='submit'
              className={`h-[2rem] w-[80px] rounded-[5px] border-2 disabled:bg-gray-200`}
              disabled={bidang ? false : true}
            >
              Tambah
            </button>
            <button
              type='reset'
              className='h-[2rem] w-[80px] rounded-[5px] border-2'
              onClick={resetHandler}
            >
              Reset
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            referensi.current.close()
          }}
          className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
        >
          <IconX className='h-[20px] w-[20px]' />
        </button>
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
