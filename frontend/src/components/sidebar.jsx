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

export default function Sidebar(props) {
  const { pengguna } = props
  const [manajemenToggle, setManajemenToggle] = useState(false)
  const [riwayatToggle, setRiwayatToggle] = useState(false)

  return (
    <aside className='fixed left-0 top-[5rem] z-10 flex h-full w-[15rem] flex-col bg-sky-300'>
      <div className='oveflow-y-auto flex flex-grow flex-col justify-between overflow-x-hidden'>
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
              {pengguna.hakAkses === 'Admin' && (
                <li>
                  <Link href='/manajemen/pengguna'>Pengguna</Link>
                </li>
              )}
              {/*Hak Akses Pengguna*/}
              {pengguna.hakAkses === 'Standar' && (
                <>
                  <li>
                    <Link href='/manajemen/arsip'>Arsip</Link>
                  </li>
                  {pengguna.jabatan === 'Kepala Bidang' &&
                    pengguna.bidang === 5 && (
                      <>
                        <li>
                          <Link href='/manajemen/kategori'>Kategori Arsip</Link>
                        </li>
                        <li>
                          <Link href='/manajemen/penyimpanan'>Penyimpanan</Link>
                        </li>
                      </>
                    )}
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
          {pengguna.hakAkses === 'Standar' &&
            (pengguna.jabatan === 'Kepala Desa' ||
              pengguna.jabatan === 'Sekretaris' ||
              pengguna.bidang === 5) && (
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
