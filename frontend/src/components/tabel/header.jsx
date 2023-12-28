'use client'

import { IconCirclePlus } from '@tabler/icons-react'

export default function Header(props) {
  const { referensi, jabatan } = props
  // console.log(jabatan)
  return (
    <div className='flex h-[4rem] w-full flex-row items-center justify-between px-[.5rem] md:px-[2rem]'>
      <div>
        {(jabatan !== 'Sekretaris' || jabatan !== 'Kepala Desa') && (
          <button
            className='flex h-[2.5rem] items-center justify-center gap-x-1 rounded-full border-2 border-black md:w-[8rem]'
            onClick={() => {
              referensi.current.showModal()
            }}
          >
            <span>Tambah</span>
            <IconCirclePlus
              className='h-[25px] w-[25px]'
              color='#000000'
              stroke={2}
            />
          </button>
        )}
      </div>
      <div>
        <input
          className='border=2 h-[2.5rem] w-[7rem] rounded-full border-2 border-black px-[15px] outline-none md:w-[20rem]'
          type='text'
          placeholder='Pencarian'
        />
      </div>
    </div>
  )
}
