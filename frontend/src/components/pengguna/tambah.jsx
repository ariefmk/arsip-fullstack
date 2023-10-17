import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus, IconX } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'

export default function Tambah({ referensi }) {
  const [akses, setAkses] = useState('')
  const [jabatan, setJabatan] = useState('')
  const fileLabelRef = useRef()
  const fileInputRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(skemaPenggunaTambah),
  })
  const resetHandler = () => {
    fileLabelRef.current.textContent = ''
  setAkses('')
    setJabatan('')
    reset()
  }

  const tambahPengguna = (data) => {
    console.log(data)
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box w-[700px] max-w-[700px]'>
        <form
          className='flex flex-col gap-y-3'
          onSubmit={handleSubmit(tambahPengguna)}
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
                  <option value='admin'>Admin</option>
                  <option value='pengguna'>Pengguna</option>
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
                  disabled={akses === 'pengguna' ? false : true}
                  onClick ={() =>
                      setJabatan(getValues('jabatan'))}
                >
                  <option value=''>Jabatan</option>
                  <option value='kepala-desa'>Kepala Desa</option>
                  <option value='sekretaris'>Sekretaris</option>
                  <option value='kepala-bidang'>Kepala Bidang</option>
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
                  disabled={akses === 'pengguna' && jabatan === 'kepala-bidang' ? false : true}
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
                    errors.kelamin
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
                  <option value='laki-laki'>Laki-Laki</option>
                  <option value='perempuan'>Perempuan</option>
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
                    errors.nomor
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='nomor'
                  {...register('nomor')}
                  onInput={hanyaAngka}
                  inputMode='numeric'
                  disabled={akses ? false : true}
                />
                {errors.nomor?.message && (
                  <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                    {errors.nomor?.message}
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
            reset()
            referensi.current.close()
          }}
          className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
        >
          <IconX
            className='h-[20px] w-[20px]'
          />
        </button>
      </div>
      <button
        onClick={() => {
          reset()
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
