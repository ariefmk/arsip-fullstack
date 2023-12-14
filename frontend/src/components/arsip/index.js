'use client'
import { useRef } from 'react'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'

export default function Arsip(props) {
  const { nik, datalist, kategori, pengguna, penyimpanan }= props
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} />
      <Tabel datalist={datalist} penyimpanan={penyimpanan}/>
      <Tambah referensi={ref} nik={nik} kategori={kategori} pengguna={pengguna} penyimpanan={penyimpanan} />
    </>
  )
}
