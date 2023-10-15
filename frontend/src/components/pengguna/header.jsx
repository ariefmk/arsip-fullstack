'use client'
import { IconCirclePlus } from '@tabler/icons-react'
import { useRef } from 'react'
import Tambah from './tambah'

export default function Header() {
  const ref = useRef()
  return (
    <div className='flex h-[4rem] w-full flex-row items-center justify-between px-[.5rem] md:px-[2rem]'>
      <button
        className='flex h-[2.5rem] items-center justify-center gap-x-1 rounded-full border-2 border-black md:w-[8rem]'
        onClick={() => {
          ref.current.showModal()
        }}
      >
        <span>Tambah</span>
        <IconCirclePlus
          className='h-[25px] w-[25px]'
          color='#000000'
          stroke={2}
        />
      </button>
      <div>
        <input
          className='border=2 h-[2.5rem] w-[7rem] rounded-full border-2 border-black px-[15px] outline-none md:w-[20rem]'
          type='text'
          placeholder='Pencarian'
        />
      </div>
      <Tambah referensi={ref} />
    </div>
  )
}
