'use client'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'
import { useRef, useState } from 'react'

export default function Kategori({ datalist }) {
  const ref = useRef()
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <Header referensi={ref} onSearch={setSearchTerm}/>
      <Tabel datalist={datalist} searchTerm={searchTerm} />
      <Tambah referensi={ref} />
    </>
  )
}
