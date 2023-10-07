import Image from 'next/image'
import balangan from '@/static/balangan.png'
import { IconUserCircle } from '@tabler/icons-react'
import FormMasuk from './components/formMasuk'

export default function Masuk() {
  return (
    <main className='main-container'>
      <div className='login-container flex flex-col pt-[1rem] md:pt-[6rem] gap-y-[.5rem] md:gap-y-[1.5rem]'>
        <div className='flex flex-col items-center gap-y-2'>
          <div className='login-logo'>
            <Image
              src={balangan}
              alt='Balangan'
              className='logo-container w-[60px] h-[60px] md:w-[150px] md:h-[150px]'
            />
          </div>
          <div className='login-title'>
            <h1 className='text-lg md:text-3xl font-bold text-center'>
              APLIKASI ARSIP KANTOR DESA MAMPARI
            </h1>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='login-form-container bg-white flex flex-col items-center self-center justify-evenly rounded-[2rem] border-2 border-black w-[16rem] md:w-[20rem] h-[16rem] md:h-[20rem]'>
            <div className='' >
              <IconUserCircle
                color='#0362a1'
                stroke={1.2}
                className='w-[60px] h-[60px] md:w-[80px] md:h-[80px]'
              />
            </div>
            <FormMasuk />
          </div>
        </div>
      </div>
    </main>
  )
}
