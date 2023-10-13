'use client'
import Link from 'next/link'
import { useState, useRef} from 'react'

export default function Sidebar({ menu }) {
  const [manajemen, setManajemen] = useState(false)
  const ref = useRef()

  const handleManajemen = () => {
    setManajemen(!manajemen)
  }
  const handleRiwayat = () => {
    const sibling = ref.current.nextSibling
    console.log(sibling.classList)
  }
  return (
    <aside className='hidden md:flex md:relative'>
      <ul className='daisy-menu'>
        <li>
          <Link
            href='/beranda'
          >
            Beranda
          </Link>
        </li>
        <li>
          <span className='daisy-menu-dropdown-toggle' onClick={handleManajemen}>Manajemen</span>
          <ul className={`daisy-menu-dropdown ${manajemen? 'daisy-menu-dropdown-show': ''}`}>
            <li>
              <Link
                href='/pengguna'
              >
                Pengguna
              </Link>
            </li>
            <li>
              <Link
                href='/akses'
              >
                Hak Akses
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span className='daisy-menu-dropdown-toggle' ref={ref} onClick={handleRiwayat}>Riwayat</span>
          <ul className='daisy-menu-dropdown'>
            <li>
              Pengguna
            </li>
            <li>
              Arsip
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  )
}
