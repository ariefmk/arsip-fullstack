'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IconHome, IconHistory, IconSettings2 } from '@tabler/icons-react'

export default function Sidebar({ manajemen, riwayat }) {
  const [manajemenToggle, setManajemenToggle] = useState(false)
  const [riwayatToggle, setRiwayatToggle] = useState(false)

  const kapital = (text) => {
    // Fungsi untuk mengubah huruf awal jadi kapital
    const arr = text.split(' ')

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }

    return arr.join(' ')
  }

  const tambahStrip = (text) => {
    const arr = text.split(' ')
    return arr.join('-')
  }

  return (
    <aside className='relative hidden h-full w-[15rem] md:block'>
      <div className='fixed h-full w-[15rem] bg-sky-300'>
        <ul className='daisy-menu text-[1rem]'>
          <li>
            <Link href='/beranda'>
              <IconHome className='h-[20px] w-[20px]' />
              Beranda
            </Link>
          </li>
          {Array.isArray(manajemen) && (
            <li>
              <Link
                href='/manajemen'
                className={`daisy-menu-dropdown-toggle ${
                  manajemenToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
                onClick={() => setManajemenToggle(!manajemenToggle)}
              >
              <IconSettings2 className='h-[20px] w-[20px]' />
                Manajemen
              </Link>
              <ul
                className={`daisy-menu-dropdown ${
                  manajemenToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
              >
                {manajemen.map((data) => (
                  <li key={data}>
                    <Link href={`/manajemen/${tambahStrip(data)}`}>
                      {kapital(data)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {Array.isArray(riwayat) && (
            <li>
              <Link
                href='/riwayat'
                className={`daisy-menu-dropdown-toggle ${
                  riwayatToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
                onClick={() => setRiwayatToggle(!riwayatToggle)}
              >
                <IconHistory className='h-[20px] w-[20px]' />
                Riwayat
              </Link>
              <ul
                className={`daisy-menu-dropdown ${
                  riwayatToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
              >
                {riwayat.map((data) => (
                  <li key={data}>
                    <Link href={`/riwayat/${tambahStrip(data)}`}>
                      {kapital(data)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}
