import { IconX } from '@tabler/icons-react'
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
      className='h-[2rem] w-[80px] rounded-[5px] border-2 disabled:bg-gray-200'
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
    >
      Tambah
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
