'use client'
import { useRef } from 'react'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'

export default function Arsip() {
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} />
      <Tabel />
      <Tambah referensi={ref} />
    </>
  )
}
