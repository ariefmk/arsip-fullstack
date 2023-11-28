import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus, IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { inputInisial } from '@/lib/class'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi, datalist }) {
  const router = useRouter()
  const [akses, setAkses] = useState('')
  const [jabatan, setJabatan] = useState('')
  const fileLabelRef = useRef()
  const fileInputRef = useRef()

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(skemaPenggunaTambah(datalist)),
  })
  const resetHandler = () => {
    reset()
    fileLabelRef.current.textContent = ''
    setAkses('')
    setJabatan('')
  }

  const tambahPengguna = (data) => {
    // console.log(data)
    const formData = new FormData()
    formData.append('hak', data.hak)
    formData.append('nik', data.nik)
    formData.append('kataSandi', data.kataSandi)
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal.toISOString())
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
    formData.append('berkas', data.berkas[0])
    if (data.jabatan) {
      formData.append('jabatan', data.jabatan)
    }
    if (data.jabatan === 'Kepala Bidang') {
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
      formData.append('bidang', data.bidang)
    }

    fetch('/api/pengguna/tambah', {
      method: 'POST',
      body: formData,
    }).then(() => {
      setAkses('')
      setJabatan('')
      reset()
      referensi.current.close()
      router.refresh()
    })
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box max-w-[600px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(tambahPengguna)}
          encType='multipart/form-data'
        >
          <h1 className='text-center text-2xl font-bold'>Tambah Pengguna</h1>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between gap-x-2'>
              <div className='w-[300px]'>
                <select
                  className={`${inputInisial} w-full border-black`}
                  name='hak'
                  {...register('hak', {
                    onChange: () => {
                      setAkses(getValues('hak'))
                    },
                  })}
                >
                  <option value=''>Hak Akses</option>
                  <option value='Admin'>Admin</option>
                  <option value='Standar'>Standar</option>
                </select>
                <Kesalahan errors={errors.hak?.message} />
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  placeholder='NIK'
                  className={`${inputInisial} ${
                    errors.nik
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='nik'
                  {...register('nik')}
                  inputMode='numeric'
                  maxLength='16'
                  onInput={hanyaAngka}
                  disabled={akses ? false : true}
                />
                <Kesalahan errors={errors.nik?.message} />
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
                  disabled={akses ? false : true}
                  {...register('kataSandi')}
                />
                <Kesalahan errors={errors.kataSandi?.message} />
              </div>
            </div>
          </div>
          <h2 className='text-center text-xl font-semibold'>Data Pengguna</h2>
          <div className='flex flex-col gap-y-3'>
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
                  disabled={akses ? false : true}
                />
                <Kesalahan errors={errors.nama?.message} />
              </div>
              <div className='w-full'>
                <select
                  className={`${inputInisial} ${
                    errors.jabatan
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  name='jabatan'
                  disabled={akses === 'Standar' ? false : true}
                  {...register('jabatan', {
                    onChange: () => setJabatan(getValues('jabatan')),
                  })}
                >
                  <option value=''>Jabatan</option>
                  <option value='Kepala Desa'>Kepala Desa</option>
                  <option value='Sekretaris'>Sekretaris</option>
                  <option value='Kepala Bidang'>Kepala Bidang</option>
                </select>
                <Kesalahan errors={errors.jabatan?.message} />
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
                  disabled={
                    akses === 'Standar' && jabatan === 'Kepala Bidang'
                      ? false
                      : true
                  }
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
                  disabled={akses ? false : true}
                />
                <Kesalahan errors={errors.tanggal?.message} />
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
                  disabled={akses ? false : true}
                >
                  <option value=''>Jenis Kelamin</option>
                  <option value='1'>Laki-Laki</option>
                  <option value='2'>Perempuan</option>
                </select>
                <Kesalahan errors={errors.kelamin?.message} />
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
                  disabled={akses ? false : true}
                />
                <Kesalahan errors={errors.telepon?.message} />
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
                disabled={akses ? false : true}
              />
              <Kesalahan errors={errors.alamat?.message} />
            </div>
          </div>
          <div>
            <div className='flex flex-col items-center justify-center gap-y-3'>
              <input
                type='file'
                id={`tambah-foto`}
                ref={fileInputRef}
                accept='image/*'
                hidden
                {...register('berkas', {
                  disabled: akses ? false : true,
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
                htmlFor='tambah-foto'
                className={`flex h-[2.5rem] w-[120px] border-black ${
                  akses ? 'cursor-copy' : 'cursor-not-allowed bg-gray-200'
                } items-center justify-center rounded-[5px] border-2`}
              >
                <span>Foto Profil</span>
                <IconCirclePlus className='h-[20px] w-[20px]' />
              </label>
            </div>
            <div ref={fileLabelRef}></div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah disabled={akses ? false : true} />
            <TombolReset onClick={resetHandler} />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            setAkses('')
            setJabatan('')
            reset()
            referensi.current.close()
          }}
        />
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          setAkses('')
          setJabatan('')
          reset()
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
