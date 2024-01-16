'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TombolKeluar, TombolBatal } from '@/lib/button'
import { IconUserCircle } from '@tabler/icons-react'

export default function Header(props) {
  const { profil, keluar } = props
  const { nama, nik, gambar } = profil
  const router = useRouter()
  return (
    <header
      className={`fixed top-0 z-10 flex h-[5rem] w-full items-center justify-between bg-green-400 px-[2rem]`}
    >
      <div>
        <Link href='/'>
          <span className={`text-2xl font-bold`}>E-Arsip Mampari</span>
        </Link>
      </div>
      <div className={`flex items-center gap-x-2`}>
        <div className={`flex flex-col items-end`}>
          <span className={`text-xl font-bold`}>{nama}</span>
          <span className={`text-sm`}>{nik}</span>
        </div>
        <div
          className={`daisy-dropdown daisy-dropdown-end h-[3.5rem] w-[3.5rem]`}
        >
          <div
            tabIndex={0}
            role='button'
            className={`h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full bg-white`}
          >
            {JSON.stringify(gambar) !== '{}' ? (
              <Image
                src={`data:image/*;base64,${gambar.media}`}
                alt='Gambar Profil'
                width={gambar.width}
                height={gambar.height}
                className={`rounded-full`}
              />
            ) : (
              <IconUserCircle
                color='#0362a1'
                stroke={1.2}
                className={`h-full w-full`}
              />
            )}
          </div>
          <ul
            tabIndex={0}
            className={`daisy-menu daisy-dropdown-content daisy-menu-md mt-4 w-40 rounded-box bg-blue-200 shadow`}
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
                  keluar.current.showModal()
                }}
              >
                <span>Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
