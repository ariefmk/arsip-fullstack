import Link from 'next/link'
import Image from 'next/image'

import balangan from '@/static/balangan.png'

export default function Header(props) {
  return (
    <header className='h-[4rem] flex bg-green-400'>
      <div className='nav-container px-[2rem] w-full flex flex-row justify-between items-center'>
        <div className='title-container'>
          <h1 className='text-3xl font-bold'>
            <Link
              href='/'>
              E-Arsip Mampari
            </Link>
          </h1>
        </div>
        <div className='flex flex-row items-center gap-x-[1rem]'>
          <p>
            {props.nama}
          </p>
          <span className='rounded-full bg-white'>
            <Image
              src={balangan}
              alt='Balangan'
              className='h-[3rem] w-[3rem] rounded-full'
            />
          </span>
        </div>
      </div>
    </header>
  )
}
