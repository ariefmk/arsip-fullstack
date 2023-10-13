'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Sidebar({ manajemen, riwayat }) {
  const [manajemenToggle, setManajemenToggle] = useState(false)
  const [riwayatToggle, setRiwayatToggle] = useState(false)

  return (
    <aside className='hidden w-[15rem] md:block'>
      <ul className='daisy-menu'>
        <li>
          <Link href='/beranda'>Beranda</Link>
        </li>
        <li>
          <span
            className={`daisy-menu-dropdown-toggle ${
              manajemen ? 'daisy-menu-dropdown-show' : ''
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
            <li>
              <Link href='manajemen/pengguna'>Pengguna</Link>
            </li>
            <li>
              <Link href='manajemen/akses'>Hak Akses</Link>
            </li>
            <li>
              <Link href='manajemen/arsip'>Arsip</Link>
            </li>
            <li>
              <Link href='manajemen/kategori'>Kategori Arsip</Link>
            </li>
          </ul>
        </li>
        <li>
          <span
            className={`daisy-menu-dropdown-toggle ${
              riwayat ? 'daisy-menu-dropdown-show' : ''
            }`}
            onClick={() => setRiwayatToggle(!riwayatToggle)}
          >
            Riwayat
          </span>
          <ul
            className={`daisy-menu-dropdown ${
              riwayatToggle ? 'daisy-menu-dropdown-show' : ''
            }`}
          >
            <li>
              <Link href='/riwayat/pengguna'>Pengguna</Link>
            </li>
            <li>
              <Link href='/riwayat/arsip'>Arsip</Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  )
}
