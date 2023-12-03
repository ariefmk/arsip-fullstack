'use client'
import { useRef } from 'react'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'

export default function Arsip({ datalist, kategori, pengguna, penyimpanan }) {
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} />
      <Tabel datalist={datalist}/>
      <Tambah referensi={ref} kategori={kategori} pengguna={pengguna} penyimpanan={penyimpanan} />
    </>
  )
}
