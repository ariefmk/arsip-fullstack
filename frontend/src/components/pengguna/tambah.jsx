import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus, IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'

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
  } = useForm({
    resolver: yupResolver(skemaPenggunaTambah(datalist)),
  })
  const resetHandler = () => {
    reset()
    fileLabelRef.current.textContent = ''
    setAkses('')
    setJabatan('')
  }

  const tambahPengguna = async (data) => {
    const formData = new FormData()
    formData.append('hak', data.hak)
    formData.append('nik', data.nik)
    formData.append('kataSandi', data.kataSandi)
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal.toISOString())
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
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
      <div className='daisy-modal-box w-[700px] max-w-[700px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(tambahPengguna)}
          encType='multipart/form-data'
        >
          <h1 className='text-center text-2xl font-bold'>Tambah Pengguna</h1>
          <div className='flex flex-col gap-y-3'>
            <div className='flex justify-between gap-x-3'>
              <div className='w-[120px]'>
                <select
                  className='h-[2.5rem] w-[120px] rounded-[5px] border-2 border-black bg-white px-[5px] outline-none'
                  name='hak'
                  {...register('hak')}
                  onClick={() => {
                    setAkses(getValues('hak'))
                  }}
                >
                  <option value=''>Hak Akses</option>
                  <option value='Admin'>Admin</option>
                  <option value='Standar'>Standar</option>
                </select>

                {errors.hak?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.hak?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  placeholder='NIK'
                  className={`h-[2.5rem] rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.nik
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='nik'
                  {...register('nik')}
                  inputMode='numeric'
                  maxLength='16'
                  onInput={hanyaAngka}
                  disabled={akses ? false : true}
                />
                {errors.nik?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.nik?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <input
                  type='password'
                  placeholder='Kata Sandi'
                  className={`h-[2.5rem] rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.kataSandi
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='kataSandi'
                  {...register('kataSandi')}
                  disabled={akses ? false : true}
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
          <div className='flex flex-col gap-y-3'>
            <div className='flex justify-between gap-x-3'>
              <div className='w-[400px]'>
                <input
                  type='text'
                  placeholder='Nama Lengkap'
                  className={`h-[2.5rem] w-[250px] rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.nama
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='nama'
                  {...register('nama')}
                  disabled={akses ? false : true}
                />
                {errors.nama?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.nama?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <select
                  className={`h-[2.5rem] w-full rounded-[5px] border-2 bg-white px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.jabatan
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='jabatan'
                  {...register('jabatan')}
                  disabled={akses === 'Standar' ? false : true}
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
                  className={`h-[2.5rem] w-full rounded-[5px] border-2 bg-white px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.bidang
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
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
                {errors.bidang?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.bidang?.message}
                  </span>
                )}
              </div>
            </div>
            <div className='flex justify-between gap-x-3'>
              <div>
                <input
                  type='date'
                  placeholder='Tanggal Lahir'
                  className={`h-[2.5rem] rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.tanggal
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='tanggal'
                  {...register('tanggal')}
                  disabled={akses ? false : true}
                />
                {errors.tanggal?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.tanggal?.message}
                  </span>
                )}
              </div>
              <div className='w-full'>
                <select
                  className={`h-[2.5rem] rounded-[5px] border-2 bg-white px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.kelamin
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='kelamin'
                  {...register('kelamin')}
                  disabled={akses ? false : true}
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
              <div>
                <input
                  type='text'
                  placeholder='Nomor Telepon'
                  className={`h-[2.5rem] w-[250px] rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                    errors.telepon
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='telepon'
                  {...register('telepon')}
                  onInput={hanyaAngka}
                  inputMode='numeric'
                  disabled={akses ? false : true}
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
                className={`h-[2.5rem] w-full rounded-[5px] border-2 px-[5px] outline-none disabled:bg-gray-200 ${
                  errors.alamat
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                }`}
                name='alamat'
                {...register('alamat')}
                disabled={akses ? false : true}
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
                id='tambah-foto'
                ref={fileInputRef}
                accept='image/*'
                hidden
                onChange={(e) => {
                  fileLabelRef.current.textContent = e.target.files[0].name
                }}
                disabled={akses ? false : true}
              />
              <label
                htmlFor='tambah-foto'
                className={`flex h-[2.5rem] w-[120px] ${
                  akses ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-200'
                } items-center justify-center rounded-[5px] border-2`}
              >
                <span>Foto Profil</span>
                <IconCirclePlus className='h-[20px] w-[20px]' />
              </label>
            </div>
            <div ref={fileLabelRef}></div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <button
              type='submit'
              className='h-[2rem] w-[80px] rounded-[5px] border-2 disabled:bg-gray-200'
              disabled={akses ? false : true}
            >
              Tambah
            </button>
            <button
              type='button'
              className='h-[2rem] w-[80px] rounded-[5px] border-2'
              onClick={resetHandler}
            >
              Reset
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            setAkses('')
            setJabatan('')
            reset()
            referensi.current.close()
          }}
          className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
        >
          <IconX className='h-[20px] w-[20px]' />
        </button>
      </div>
      <button
        onClick={() => {
          setAkses('')
          setJabatan('')
          reset()
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
