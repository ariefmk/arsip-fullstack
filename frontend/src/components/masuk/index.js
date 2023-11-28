import Image from 'next/image'
import balangan from '@/static/balangan.png'
import mampari from '@/static/mampari.jpg'
import { IconUserCircle } from '@tabler/icons-react'
import FormMasuk from './masuk'

export default function Masuk() {
  const background = {
    background: `url(${mampari.src})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
  // console.log(mampari)
  return (
    <main
      style={background}
      className='flex h-screen items-center justify-center'
    >
      <div className='flex flex-col gap-y-[.5rem] mt-[-2rem] md:mt-[-6rem] md:gap-y-[1.5rem]'>
        <div className='flex flex-col items-center gap-y-2'>
          <div>
            <Image
              src={balangan}
              alt='Balangan'
              className='h-[60px] w-[60px] md:h-[150px] md:w-[150px]'
            />
          </div>
          <div>
            <h1 className='text-center text-lg font-bold text-white md:text-3xl'>
              APLIKASI ARSIP KANTOR DESA MAMPARI
            </h1>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex h-[16rem] w-[16rem] flex-col items-center justify-evenly rounded-[2rem] border-2 border-black bg-white md:h-[20rem] md:w-[20rem]'>
            <IconUserCircle
              color='#0362a1'
              stroke={1.2}
              className='h-[60px] w-[60px] md:h-[80px] md:w-[80px]'
            />
            <FormMasuk />
          </div>
        </div>
      </div>
    </main>
  )
}
