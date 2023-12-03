import {
  IconX,
  IconEdit,
  IconCircleMinus,
  IconDownload,
} from '@tabler/icons-react'
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
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 disabled:cursor-not-allowed disabled:bg-gray-200`}
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

export const TombolBatal = ({ onClick}) => {
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2`}
      onClick={onClick}
    >
      Tidak
    </button>
  )
}

export const TombolAksiHapus = ({ className, onClick, onChange }) => {
  return (
    <button
      type='button'
      className={`${className} flex flex-row items-center justify-center rounded-[10px] border-[2px] border-red-500 bg-white hover:bg-red-500 hover:text-white`}
      onClick={onClick}
      onChange={onChange}
    >
      <IconCircleMinus stroke={2} />
    </button>
  )
}

export const TombolAksiUbah = ({ className, onClick, onChange }) => {
  return (
    <button
      type='button'
      className={`${className} flex flex-row items-center justify-center rounded-[10px] border-[2px] border-green-500 bg-white hover:bg-green-500 hover:text-white`}
      onClick={onClick}
      onChange={onChange}
    >
      <IconEdit stroke={2} />
    </button>
  )
}

export const TombolAksiUnduh = ({ className, onClick, onChange }) => {
  return (
    <button
      type='button'
      className={`${className} flex flex-row items-center justify-center rounded-[10px] border-[2px] border-blue-500 bg-white hover:bg-blue-500 hover:text-white`}
      onClick={onClick}
      onChange={onChange}
    >
      <IconDownload stroke={2} />
    </button>
  )
}
