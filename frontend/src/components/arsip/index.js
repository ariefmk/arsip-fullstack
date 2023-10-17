'use client'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import { useRef } from 'react'

export default function Arsip() {
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} />
      <Tambah referensi={ref} />
    </>
  )
}
