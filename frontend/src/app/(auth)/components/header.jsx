'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { hapusAkses } from '../lib'
import { redirect } from 'next/navigation'
import balangan from '@/static/balangan.png'

export default function Header(props) {
  const [ada, setAda] = useState(false)
  const modalRef = useRef(null)

  const modalHandler = () => {
    setAda(!ada)
  }
  return (
    <header className='h-[5rem] flex bg-green-400'>
      <div className='nav-container px-[2rem] w-full flex flex-row justify-between items-center'>
        <div className='title-container'>
          <h1 className='text-2xl font-bold'>
            <Link
              href='/beranda'>
              E-Arsip Mampari
            </Link>
          </h1>
        </div>
        <div className='hidden md:flex flex-row items-center gap-x-[1rem]'>
          <p>
            {props.nama}
          </p>
          <button className='rounded-full bg-white' onClick={modalHandler}>
            <Image
              src={balangan}
              alt='Balangan'
              className='h-[3.5rem] w-[3.5rem] rounded-full'
            />
          </button>
        </div>
        <div className={`modal ${ada? '': 'hidden'} absolute top-[5.2rem] right-[2rem]`} ref={modalRef}>
          <div className='bg-blue-200 rounded-[5px]'>
            <ul className='flex flex-col text-center w-[5rem] h-[3.5rem] gap-y-1 font-bold'>
              <Link
                onClick={modalHandler}
                className='w-[5rem] inline-block'
                href='/profil'
              >
                <li >
                  Profil
                </li>
              </Link>
              <Link
                className='w-[5rem] inline-block'
                href='/keluar'
              >
                <li>
                  Keluar
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
