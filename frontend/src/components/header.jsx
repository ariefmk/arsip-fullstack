'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TutupModal, TombolKeluar, TombolBatal } from '@/lib/button'
import { IconUserCircle } from '@tabler/icons-react'

export default function Header({ pengguna }) {
  const referensi = useRef()
  const router = useRouter()

  return (
    <header className='fixed top-0 z-10 flex h-[5rem] w-full items-center justify-between bg-green-400 px-[2rem]'>
      <Link href='/beranda'>
        <span className='text-2xl font-bold'>E-Arsip Mampari</span>
      </Link>
      <div className='hidden items-center gap-x-2 gap-y-0 md:flex'>
        <div className='flex flex-col items-end'>
          <span className='text-xl font-bold'>{pengguna.nama}</span>
          <span className='text-sm'>{pengguna.nik}</span>
        </div>
        <div className='daisy-dropdown daisy-dropdown-end h-[3.5rem] w-[3.5rem]'>
          <button className='h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full bg-white'>
            {JSON.stringify(pengguna.gambar) !== '{}' ? (
              <Image
                src={`data:image/*;base64,${pengguna.gambar.media}`}
                alt='Gambar profil'
                width={pengguna.gambar.width}
                height={pengguna.gambar.height}
                className={`rounded-full`}
              />
            ) : (
              <IconUserCircle
                color='#0362a1'
                stroke={1.2}
                className='h-full w-full'
              />
            )}
          </button>
          <ul
            tabIndex={0}
            className='daisy-menu daisy-dropdown-content daisy-menu-md mt-4 w-40 rounded-box bg-blue-200 shadow'
          >
            <li>
              <Link href='/profil' className='hover:font-bold'>
                Profil
              </Link>
            </li>
            <li>
              <button
                type='button'
                className='hover:font-bold'
                onClick={() => {
                  referensi.current.showModal()
                }}
              >
                <span>Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <dialog className='daisy-modal backdrop-blur-[2px]' ref={referensi}>
        <div className='daisy-modal-box relative bottom-[60px] max-w-[250px]'>
          <h1 className='mb-[2rem] text-center text-2xl font-bold'>Keluar?</h1>
          <div className='flex w-full flex-row justify-center gap-x-2'>
            <TombolKeluar
              onClick={() => {
                router.push('/keluar')
                router.refresh()
              }}
            />
            <TombolBatal
              onClick={() => {
                referensi.current.close()
              }}
            />
          </div>
        </div>
      </dialog>
    </header>
  )
}
