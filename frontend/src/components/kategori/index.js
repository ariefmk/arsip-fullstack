'use client'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'
import { useRef } from 'react'

export default function Kategori({datalist}) {
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} />
      <Tabel datalist={datalist} />
      <Tambah referensi={ref} />
    </>
  )
}
