'use client'

import { IconCirclePlus } from '@tabler/icons-react'
import { useRef, useEffect } from 'react'
import { hanyaAngka } from '@/lib/form'

export default function ModalTambah({ referensi }) {
  const fileLabelRef = useRef()
  const fileInputRef = useRef()

  const reset = () => {
    fileLabelRef.current.textContent = ''
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box w-[700px] max-w-[700px]'>
        <div>
          <form>
            <div className=''>
              <h1 className='text-center text-2xl font-bold'>
                Tambah Pengguna
              </h1>
              <div>
                <div className='flex justify-between'>
                  <select className='h-[2.5rem] w-[120px] rounded-[5px] border-2 bg-white outline-none'>
                    <option value='admin'>Admin</option>
                    <option value='pengguna'>Pengguna</option>
                  </select>
                  <input
                    type='text'
                    placeholder='NIK'
                    className='h-[2.5rem] rounded-[5px] border-2 outline-none'
                    onChange={hanyaAngka}
                  />
                  <input
                    type='password'
                    placeholder='Kata Sandi'
                    className='h-[2.5rem] rounded-[5px] border-2 outline-none'
                  />
                </div>
              </div>
            </div>
            <div>
              <span className='text-center text-xl font-semibold'>
                Data Pengguna
              </span>
              <div className='flex justify-between'>
                <input
                  type='text'
                  placeholder='Nama Lengkap'
                  className='h-[2.5rem] rounded-[5px] border-2 outline-none'
                />
                <select className='h-[2.5rem] rounded-[5px] border-2 outline-none'>
                  <option>Jabatan</option>
                </select>
                <select className='h-[2.5rem] rounded-[5px] border-2 outline-none'>
                  <option>Bidang</option>
                </select>
                <input
                  type='text'
                  placeholder='Nomor Telepon'
                  className='h-[2.5rem] rounded-[5px] border-2 outline-none'
                />
              </div>
              <input
                type='text'
                placeholder='Alamat'
                className='h-[2rem] w-full rounded-[5px] border-2 outline-none'
                id='alamat'
              />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <input
                type='file'
                id='foto'
                ref={fileInputRef}
                hidden
                onChange={(e) => {
                  console.log(e.target.files[0].name)
                  console.log(fileLabelRef)
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
              <div ref={fileLabelRef}></div>
            </div>
            <div className='flex justify-center gap-x-4'>
              <button
                type='submit'
                className='h-[2rem] w-[80px] rounded-[5px] border-2'
              >
                Tambah
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
        <form method='dialog'>
          <button className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>
      </div>
      <form method='dialog' className='daisy-modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
