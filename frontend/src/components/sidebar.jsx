'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  IconHome,
  IconHistory,
  IconSettings2,
  IconReportAnalytics,
} from '@tabler/icons-react'
import { kapital, gantiSpasi } from '@/lib'

export default function Sidebar({ akses }) {
  const [manajemenToggle, setManajemenToggle] = useState(false)
  const [riwayatToggle, setRiwayatToggle] = useState(false)

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
          <li>
            <span
              href='/manajemen'
              className={`daisy-menu-dropdown-toggle ${
                manajemenToggle ? 'daisy-menu-dropdown-show' : ''
              }`}
              onClick={() => setManajemenToggle(!manajemenToggle)}
            >
              <IconSettings2 className='h-[20px] w-[20px]' />
              Manajemen
            </span>
            <ul
              className={`daisy-menu-dropdown ${
                manajemenToggle ? 'daisy-menu-dropdown-show' : ''
              }`}
            >
              {/*Hak Akses Admin*/}
              {akses === 'Admin' && (
                <li>
                  <Link href='/manajemen/pengguna'>Pengguna</Link>
                </li>
              )}
              {/*Hak Akses Pengguna*/}
              {akses === 'Standar' && (
                <>
                  <li>
                    <Link href='/manajemen/arsip'>Arsip</Link>
                  </li>
                  <li>
                    <Link href='/manajemen/kategori'>Kategori Arsip</Link>
                  </li>
                  <li>
                    <Link href='/manajemen/penyimpanan'>Penyimpanan</Link>
                  </li>
                </>
              )}
            </ul>
          </li>
          {/*Hak Akses Admin*/}
          {/*akses === 'Admin' && (
            <li>
              <span
                href='/riwayat'
                className={`daisy-menu-dropdown-toggle ${
                  riwayatToggle ? 'daisy-menu-dropdown-show' : ''
                }`}
                onClick={() => setRiwayatToggle(!riwayatToggle)}
              >
                <IconHistory className='h-[20px] w-[20px]' />
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
                <li>
                  <Link href='/riwayat/sistem'>Sistem</Link>
                </li>
              </ul>
            </li>
          )*/}
          {akses === 'Standar' && (
            <li>
              <Link href='/laporan'>
                <IconReportAnalytics className='h-[20px] w-[20px]' />
                Laporan
              </Link>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}
