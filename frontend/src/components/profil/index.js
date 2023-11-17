'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TombolSimpan } from '@/lib/button'
import { inputInisial } from '@/lib/class'
import { IconCirclePlus, IconX } from '@tabler/icons-react'

export default function Profil() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm()

  return (
    <div>
      <div className='w-[600px]'>
        <form className='flex flex-col gap-y-2'>
          <div className='flex gap-x-2'>
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='Nama Lengkap'
            />
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='Jabatan'
              disabled={true}
            />
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='Bidang'
              disabled={true}
            />
          </div>
          <div className='flex gap-x-2'>
            <input
              type='date'
              className={`${inputInisial} w-full`}
              placeholder='Tanggal Lahir'
            />
            <select className={`${inputInisial} w-full`}>
              <option value=''>Jenis Kelamin</option>
              <option value='1'>Laki-Laki</option>
              <option value='2'>Perempuan</option>
            </select>
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='Nomor Telepon'
            />
          </div>
          <div>
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='Alamat'
            />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <input type='file' id={`ubah-foto`} accept='image/*' hidden />
            <label
              htmlFor={`ubah-foto`}
              className={`flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black`}
            >
              <span>Foto Profil</span>
              <IconCirclePlus className='h-[20px] w-[20px]' />
            </label>
          </div>
          <div className={`flex flex-col items-center justify-center`}>
            <TombolSimpan />
          </div>
        </form>
      </div>
      <div className={`w-[600px]`}>
        <form className='flex flex-col gap-y-2'>
          <div className={`flex flex-row gap-x-2`}>
            <input
              type='text'
              className={`${inputInisial} w-full`}
              placeholder='NIK'
            />
            <input
              type='password'
              className={`${inputInisial} w-full`}
              autoComplete='new-password'
              placeholder='Kata Sandi Baru'
            />
            <input
              type='password'
              className={`${inputInisial} w-full`}
              autoComplete='new-password'
              placeholder='Konfirmasi Kata Sandi Baru'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
