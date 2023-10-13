'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar({ manajemen, riwayat }) {
  const [manajemenToggle, setManajemenToggle] = useState(false)
  const [riwayatToggle, setRiwayatToggle] = useState(false)

  return (
    <aside className='relative hidden h-full w-[15rem] md:block'>
      <div className='fixed h-full w-[15rem] bg-sky-300'>
        <ul className='daisy-menu text-[1rem]'>
          <li>
            <Link href='/beranda'>Beranda</Link>
          </li>
          {Array.isArray(manajemen) && (
            <li>
              <span
                className={`daisy-menu-dropdown-toggle ${
                  manajemenToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
                onClick={() => setManajemenToggle(!manajemenToggle)}
              >
                <Link href='/manajemen'>Manajemen</Link>
              </span>
              <ul
                className={`daisy-menu-dropdown ${
                  manajemenToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
              >
                {manajemen.map((data) => (
                  <li key={data.nama}>
                    <Link href={`manajemen/${data.href}`}>{data.nama}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {Array.isArray(riwayat) && (
            <li>
              <span
                className={`daisy-menu-dropdown-toggle ${
                  riwayatToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
                onClick={() => setRiwayatToggle(!riwayatToggle)}
              >
                <Link href='/riwayat'>Riwayat</Link>
              </span>
              <ul
                className={`daisy-menu-dropdown ${
                  riwayatToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
              >
                {riwayat.map((data) => (
                  <li key={data.nama}>
                    <Link href={`/riwayat/${data.href}`}>{data.nama}</Link>
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
