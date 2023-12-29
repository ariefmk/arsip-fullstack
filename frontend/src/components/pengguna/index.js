'use client'
import Header from '@/components/tabel/header'
import Tabel from './tabel'
import Tambah from './tambah'
import { useRef, useState } from 'react'

export default function Pengguna({ datalist }) {
  const ref = useRef()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <Header referensi={ref} onSearch={setSearchTerm}/>
      <Tabel datalist={datalist} searchTerm={searchTerm}/>
      <Tambah referensi={ref} datalist={datalist} />
    </>
  )
}
