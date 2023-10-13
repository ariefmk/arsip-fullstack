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
          <button className='daisy-dropdown daisy-dropdown-end rounded-full bg-white'>
            <Image
              tabIndex={0}
              src={balangan}
              alt='Balangan'
              className='h-[3.5rem] w-[3.5rem] rounded-full'
            />
          <ul tabIndex={0} className='daisy-menu daisy-menu-md daisy-dropdown-content w-[200px] mt-[1rem] shadow border-2 rounded-box text-center'>
            <li>
              <Link
                href='/profil'
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                href='/keluar'
              >
                Keluar
              </Link>
            </li>
          </ul>
          </button>
        </div>
      </div>
    </header>
  )
}
