'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus } from '@tabler/icons-react'
import { useRef, useEffect } from 'react'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'

export default function Ubah({ referensi }) {
  const fileLabelRef = useRef()
  const fileInputRef = useRef()

  const {
    register: registerTambah,
    handleSubmit: handleSubmitTambah,
    formState: { errors: errorsTambah },
    reset: resetTambah,
  } = useForm({
    resolver: yupResolver(skemaPenggunaTambah),
  })
  const reset = () => {
    fileLabelRef.current.textContent = ''
    resetTambah()
  }

  const tambahPengguna = (data) => {
    console.log(data)
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box w-[700px] max-w-[700px]'>
        <div>
          <form
            className='flex flex-col gap-y-3'
            onSubmit={handleSubmitTambah(tambahPengguna)}
          >
            <h1 className='text-center text-2xl font-bold'>Ubah Pengguna</h1>
            <div className='flex flex-col gap-y-3'>
              <div className='flex justify-between gap-x-3'>
                <div className='w-[120px]'>
                  <select
                    className='h-[2.5rem] w-[120px] rounded-[5px] border-2 bg-white px-[5px] outline-none'
                    name='hak'
                    {...registerTambah('hak')}
                  >
                    <option>Hak Akses</option>
                    <option value='admin'>Admin</option>
                    <option value='pengguna'>Pengguna</option>
                  </select>

                  {errorsTambah.hak?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.hak?.message}
                    </span>
                  )}
                </div>
                <div className='w-full'>
                  <input
                    type='text'
                    placeholder='NIK'
                    className='h-[2.5rem] rounded-[5px] border-2 px-[5px] outline-none'
                    name='nik'
                    {...registerTambah('nik')}
                    inputMode='numeric'
                    maxLength='16'
                    onInput={hanyaAngka}
                  />
                  {errorsTambah.nik?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.nik?.message}
                    </span>
                  )}
                </div>
                <div className='w-full'>
                  <input
                    type='password'
                    placeholder='Kata Sandi'
                    className='h-[2.5rem] rounded-[5px] border-2 px-[5px] outline-none'
                    name='kataSandi'
                    {...registerTambah('kataSandi')}
                  />
                  {errorsTambah.kataSandi?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.kataSandi?.message}
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
                    className='h-[2.5rem] w-[250px] rounded-[5px] border-2 px-[5px] outline-none'
                    name='nama'
                    {...registerTambah('nama')}
                  />
                  {errorsTambah.nama?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.nama?.message}
                    </span>
                  )}
                </div>
                <div className='w-full'>
                  <select
                    className='h-[2.5rem] w-full rounded-[5px] border-2 bg-white px-[5px] outline-none'
                    name='jabatan'
                    {...registerTambah('jabatan')}
                  >
                    <option>Jabatan</option>
                    <option value='kepala desa'>Kepala Desa</option>
                    <option value='sekretaris'>Sekretaris</option>
                    <option value='kepala bidang'>Kepala Bidang</option>
                  </select>
                  {errorsTambah.jabatan?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.jabatan?.message}
                    </span>
                  )}
                </div>
                <div className=' w-full'>
                  <select
                    className='h-[2.5rem] w-full rounded-[5px] border-2 bg-white px-[5px] outline-none'
                    name='bidang'
                    {...registerTambah('bidang')}
                  >
                    <option>Bidang</option>
                    <option value='kesra'>Kesra & Pelayanan</option>
                    <option value='pemerintahan'>Pemerintahan</option>
                    <option value='kewilayahan'>Kewilayahan</option>
                    <option value='keuangan'>Keuangan</option>
                    <option value='umum'>Umum & Perencanaan</option>
                  </select>
                  {errorsTambah.bidang?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.bidang?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='flex justify-between gap-x-3'>
                <div>
                  <input
                    type='text'
                    placeholder='Nomor Telepon'
                    className='h-[2.5rem] w-[250px] rounded-[5px] border-2 px-[5px] outline-none'
                    name='nomor'
                    {...registerTambah('nomor')}
                    onInput={hanyaAngka}
                    inputMode='numeric'
                  />
                  {errorsTambah.nomor?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.nomor?.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Alamat'
                    className='h-[2.5rem] w-[390px] rounded-[5px] border-2  px-[5px] outline-none'
                    id='alamat'
                    name='alamat'
                    {...registerTambah('alamat')}
                  />
                  {errorsTambah.alamat?.message && (
                    <span className='daisy-badge daisy-badge-outline top-[35px] text-center text-xs text-error md:text-sm'>
                      {errorsTambah.alamat?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col items-center justify-center gap-y-3'>
                <input
                  type='file'
                  id='foto'
                  name='foto'
                  ref={fileInputRef}
                  hidden
                  onChange={(e) => {
                    fileLabelRef.current.textContent = e.target.files[0].name
                  }}
                />
                <label
                  htmlFor='foto'
                  className='flex h-[2.5rem] w-[120px] cursor-pointer items-center justify-center rounded-[5px] border-2'
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
                className='h-[2rem] w-[80px] rounded-[5px] border-2'
              >
                Ubah
              </button>
              <button
                type='reset'
                className='h-[2rem] w-[80px] rounded-[5px] border-2'
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={() => {
            resetTambah()
            referensi.current.close()
          }}
          className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
        >
          ✕
        </button>
      </div>
      <button
        onClick={() => {
          resetTambah()
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
