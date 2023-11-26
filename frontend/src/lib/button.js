import { IconX } from '@tabler/icons-react'
import Link from 'next/link'

export const TutupModal = ({ onClick }) => {
  return (
    <button
      type='button'
      className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
      onClick={onClick}
    >
      <IconX className='h-[20px] w-[20px]' />
    </button>
  )
}

export const TombolTambah = ({ disabled, onClick, onChange }) => {
  return (
    <button
      type='submit'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 disabled:bg-gray-200 disabled:cursor-not-allowed`}
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Tambah
    </button>
  )
}
export const TombolSimpan = ({ disabled, onClick, onChange }) => {
  return (
    <button
      type='submit'
      className='h-[2rem] w-[80px] rounded-[5px] border-2 disabled:bg-gray-200'
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Simpan
    </button>
  )
}

export const TombolReset = ({ disabled, onClick, onChange }) => {
  return (
    <button
      type='button'
      className='h-[2rem] w-[80px] rounded-[5px] border-2'
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Reset
    </button>
  )
}

export const TombolKeluar = () => {
  return (
    <Link
      href='/keluar'
      className='flex h-[2rem] w-[80px] items-center justify-center rounded-[5px] border-2 text-center'
    >
      Ya
    </Link>
  )
}

export const TombolHapus = ({ onClick }) => {
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2`}
      onClick={onClick}
    >
      Hapus
    </button>
  )
}
