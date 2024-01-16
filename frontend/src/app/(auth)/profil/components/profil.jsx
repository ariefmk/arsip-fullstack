'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { skemaProfil } from '@/lib/skema'
import { inputInisial } from '@/lib/class'

export default function Profil(props) {
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(skemaProfil()) })

  const profilHandler = (data) => {
    const formData = new FormData()
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal.toISOString())
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
  }
  return (
    <div className={`rounded-[10px] border-2 border-black px-[20px] py-[10px]`}>
      <form className={`grid grid-cols-3 gap-2`}>
        <div className={`col-span-1 flex flex-col`}>
          <label htmlFor='nama'>Nama Lengkap</label>
          <input
            type='text'
            className={`${inputInisial} w-full`}
            name='nama'
            id='nama'
            {...register('nama')}
          />
        </div>
        <div className={`col-span-1 flex flex-col`}>
          <label htmlFor='jabatan'>Jabatan</label>
          <input
            type='text'
            className={`${inputInisial} w-full border-black`}
            name='jabatan'
            id='jabatan'
            disabled={true}
            readOnly
          />
        </div>
        <div className={`col-span-1 flex flex-col`}>
          <label htmlFor='bidang'>Bidang</label>
          <input
            type='text'
            className={`${inputInisial} w-full border-black`}
            name='bidang'
            id='bidang'
            disabled={true}
            readOnly
          />
        </div>
        <div className={`col-span-1 flex flex-col`}>
          <label htmlFor='tanggal'
          >Tanggal Lahir</label>
          <input
            type='date'
            name='tanggal'
            id='tanggal'
            {...register('tanggal')}
          />
        </div>
      </form>
    </div>
  )
}
