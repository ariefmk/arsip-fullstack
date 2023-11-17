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
      <div className='daisy-modal-box'>
        <form onSubmit={handleSubmit(tambahPenyimpanan)}>
          <div>
            <input
              type='text'
              className={inputInisial}
              placeholder='Kode'
              {...register('kode')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <input
              type='text'
              className={inputInisial}
              placeholder='Keterangan'
              {...register('keterangan')}
            />
            <Kesalahan errors={errors.keterangan?.message} />
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
