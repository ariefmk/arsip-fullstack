'use client'
import Header from './header'
import Tabel from './tabel'
import Tambah from './tambah'
import { useRef } from 'react'

export default function Pengguna({ datalist }) {
  const ref = useRef()

  return (
    <>
      <Header referensi={ref} />
      <Tabel datalist={datalist} />
      <Tambah referensi={ref} datalist={datalist} />
    </>
  )
}
