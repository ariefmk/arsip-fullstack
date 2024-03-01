import {
  IconX,
  IconEdit,
  IconCircleMinus,
  IconDownload,
  IconEye,
  IconCheck,
  IconChecks,
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
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-green-400 bg-green-500 font-semibold text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-gray-100 disabled:bg-gray-200 disabled:text-gray-800`}
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
      className='h-[2rem] w-[80px] rounded-[5px] border-2 border-green-400 bg-green-500 font-semibold text-white disabled:border-black disabled:bg-gray-200 disabled:text-gray-400'
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Simpan
    </button>
  )
}

export const TombolUnduh = (props) => {
  const { disabled, onClick, onChange, form } = props
  return (
    <button
      type='submit'
      form={form}
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-green-400 bg-green-500 font-semibold text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-gray-100 disabled:bg-gray-200 disabled:text-gray-800`}
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Unduh
    </button>
  )
}

export const TombolReset = (props) => {
  const { disabled, onClick, onChange, form } = props
  return (
    <button
      type='button'
      form={form}
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-red-400 bg-red-500 font-semibold text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-gray-100 disabled:bg-gray-200 disabled:text-gray-800`}
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Reset
    </button>
  )
}

export const TombolKeluar = (props) => {
  const { onClick } = props
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-red-400 bg-red-500 font-semibold text-white`}
      onClick={onClick}
    >
      Ya
    </button>
  )
}

export const TombolHapus = ({ className, onClick }) => {
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-red-400 bg-red-500 font-semibold text-white`}
      onClick={onClick}
    >
      Hapus
    </button>
  )
}

export const TombolBatal = ({ className, onClick }) => {
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-blue-400 bg-blue-500 font-semibold text-white`}
      onClick={onClick}
    >
      Tidak
    </button>
  )
}

export const TombolSetujui = (props) => {
  const { onClick } = props
  return (
    <button
      type='button'
      className={`h-[2rem] w-[80px] rounded-[5px] border-2 border-green-400 bg-green-500 font-semibold text-white`}
      onClick={onClick}
    >
      Setujui
    </button>
  )
}

export const TombolAksiHapus = (props) => {
  const { onClick, onChange, disabled } = props
  return (
    <button
      type='button'
      className={`flex h-[2rem] w-full flex-row items-center justify-center rounded-[10px] border-[2px] border-red-500 bg-white hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-800`}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
    >
      <IconCircleMinus stroke={2} />
    </button>
  )
}

export const TombolAksiUbah = (props) => {
  const { onClick, onChange } = props
  return (
    <button
      type='button'
      className={`flex h-[2rem] w-full flex-row items-center justify-center rounded-[10px] border-[2px] border-blue-500 bg-white hover:bg-blue-500 hover:text-white`}
      onClick={onClick}
      onChange={onChange}
    >
      <IconEdit stroke={2} />
    </button>
  )
}

export const TombolAksiUnduh = (props) => {
  const { disabled, onClick, onChange } = props
  return (
    <button
      type='button'
      className={`flex h-[2rem] w-full flex-row items-center justify-center rounded-[10px] border-[2px] border-green-500 bg-white hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:border-2 disabled:border-gray-100 disabled:bg-gray-200 disabled:text-gray-800`}
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      <IconDownload stroke={2} />
    </button>
  )
}

export const TombolAksiLihat = (props) => {
  const { onClick, onChange } = props
  return (
    <button
      type='button'
      className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-green-300 bg-white hover:bg-green-300 hover:font-bold hover:text-white`}
      onClick={onClick}
    >
      <IconEye stroke={2} />
    </button>
  )
}

export const TombolAksiPersetujuan = (props) => {
  const { onClick, onChange, disabled } = props
  return (
    <button
      type='button'
      className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-blue-500 bg-white hover:bg-blue-500 hover:text-white disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white`}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
    >
      <IconCheck stroke={2} />
    </button>
  )
}
