import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus, IconX } from '@tabler/icons-react'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { inputInisial } from '@/lib/class'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Ubah({ referensi, data }) {
  const router = useRouter()
  const fileLabelRef = useRef()
  const fileInputRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    //resolver: yupResolver(skemaPenggunaTambah(datalist)),
  })
  const resetHandler = () => {
    fileLabelRef.current.textContent = ''
    reset({ ...data, kataSandi: '' })
  }
  useEffect(() => {
    setValue('hak', data.hak)
    setValue('nik', data.nik)
    setValue('nama', data.nama)
    setValue('jabatan', data.jabatan)
    setValue('tanggal', data.tanggal)
    setValue('kelamin', data.kelamin)
    setValue('telepon', data.telepon)
    setValue('alamat', data.alamat)
    switch (data.bidang) {
      case 1:
        data.bidang = 'kesra'
        break
      case 2:
        data.bidang = 'pemerintahan'
        break
      case 3:
        data.bidang = 'kewilayahan'
        break
      case 4:
        data.bidang = 'keuangan'
        break
      case 5:
        data.bidang = 'umum'
        break
      default:
        data.bidang = null
    }
    setValue('bidang', data.bidang)
  }, [setValue, data])

  const ubahPengguna = (data) => {
    const formData = new FormData()
    formData.append('nik', data.nik)
    formData.append('kataSandi', data.kataSandi)
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal)
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
    formData.append('berkas', data.berkas[0])

    fetch('/api/pengguna/ubah', {
      method: 'PUT',
      body: formData,
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
      reset({ ...data })
    })
  }

  return (
    <dialog className='daisy-modal backdrop-blur-[2px]' ref={referensi}>
      <div className='daisy-modal-box max-w-[600px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(ubahPengguna)}
          encType='multipart/form-data'
        >
          <h1 className='text-center text-2xl font-bold'>Ubah Pengguna</h1>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between gap-x-2'>
              <div className='w-[300px]'>
                <select
                  className={`${inputInisial} w-full border-black`}
                  name='hak'
                  disabled={true}
                  {...register('hak')}
                >
                  <option value=''>Hak Akses</option>
                  <option value='Admin'>Admin</option>
                  <option value='Standar'>Standar</option>
                </select>
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  placeholder='NIK'
                  className={`${inputInisial} ${
                    errors.nik
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full border-black`}
                  name='nik'
                  {...register('nik')}
                  inputMode='numeric'
                  maxLength='16'
                  onInput={hanyaAngka}
                  disabled={true}
                />
              </div>
              <div className='w-full'>
                <input
                  type='password'
                  placeholder='Kata Sandi'
                  className={`${inputInisial} ${
                    errors.kataSandi
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='kataSandi'
                  {...register('kataSandi')}
                />
                {errors.kataSandi?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.kataSandi?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <h2 className='text-center text-xl font-semibold'>Data Pengguna</h2>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between gap-x-2'>
              <div className='w-[800px]'>
                <input
                  type='text'
                  placeholder='Nama Lengkap'
                  className={`${inputInisial} ${
                    errors.nama
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='nama'
                  {...register('nama')}
                />
                {errors.nama?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.nama?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <select
                  className={`${inputInisial} ${
                    errors.jabatan
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='jabatan'
                  {...register('jabatan')}
                  disabled={true}
                  onClick={() => setJabatan(getValues('jabatan'))}
                >
                  <option value=''>Jabatan</option>
                  <option value='Kepala Desa'>Kepala Desa</option>
                  <option value='Sekretaris'>Sekretaris</option>
                  <option value='Kepala Bidang'>Kepala Bidang</option>
                </select>
                {errors.jabatan?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.jabatan?.message}
                  </span>
                )}
              </div>
              <div className=' w-full'>
                <select
                  className={`${inputInisial} ${
                    errors.bidang
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='bidang'
                  {...register('bidang')}
                  disabled={true}
                >
                  <option value=''>Bidang</option>
                  <option value='kesra'>Kesra & Pelayanan</option>
                  <option value='pemerintahan'>Pemerintahan</option>
                  <option value='kewilayahan'>Kewilayahan</option>
                  <option value='keuangan'>Keuangan</option>
                  <option value='umum'>Umum & Perencanaan</option>
                </select>
                {errors.bidang?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.bidang?.message}
                  </span>
                )}
              </div>
            </div>
            <div className='flex justify-between gap-x-2'>
              <div className='w-[150px]'>
                <input
                  type='date'
                  placeholder='Tanggal Lahir'
                  className={`${inputInisial} ${
                    errors.tanggal
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='tanggal'
                  {...register('tanggal')}
                />
                {errors.tanggal?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.tanggal?.message}
                  </span>
                )}
              </div>
              <div className='w-[300px]'>
                <select
                  className={`${inputInisial} ${
                    errors.kelamin
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='kelamin'
                  {...register('kelamin')}
                >
                  <option value=''>Jenis Kelamin</option>
                  <option value='1'>Laki-Laki</option>
                  <option value='2'>Perempuan</option>
                </select>
                {errors.kelamin?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.kelamin?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  placeholder='Nomor Telepon'
                  className={`${inputInisial} ${
                    errors.telepon
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='telepon'
                  {...register('telepon')}
                  onInput={hanyaAngka}
                  inputMode='numeric'
                />
                {errors.telepon?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.telepon?.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type='text'
                placeholder='Alamat'
                className={`${inputInisial} ${
                  errors.alamat
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                name='alamat'
                {...register('alamat')}
              />
              {errors.alamat?.message && (
                <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                  {errors.alamat?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center justify-center gap-y-3'>
              <input
                type='file'
                id={`ubah-foto-${data.nik}`}
                ref={fileInputRef}
                accept='image/*'
                hidden
                {...register('berkas', {
                  onChange: (e) => {
                    if (e.target.files.length === 1) {
                      fileLabelRef.current.textContent = e.target.files[0].name
                    } else {
                      fileLabelRef.current.textContent = ''
                    }
                  },
                })}
              />
              <label
                htmlFor={`ubah-foto-${data.nik}`}
                className='flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black'
              >
                <span>Foto Profil</span>
                <IconCirclePlus className='h-[20px] w-[20px]' />
              </label>
            </div>
            <div ref={fileLabelRef}></div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolSimpan />
            <TombolReset onClick={resetHandler} />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            reset()
            referensi.current.close()
          }}
        />
      </div>
      {/*
      <button
        onClick={() => {
          reset()
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />*/}
    </dialog>
  )
}
