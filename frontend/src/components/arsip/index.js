'use client'
import { useRef,useState} from 'react'
import Header from '@/components/tabel/header'
import Tambah from './tambah'
import Tabel from './tabel'

export default function Arsip(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const { nik, jabatan, datalist, kategori, pengguna, penyimpanan } = props
  const ref = useRef()
  return (
    <>
      <Header referensi={ref} jabatan={jabatan} onSearch={setSearchTerm}/>
      <Tabel datalist={datalist} penyimpanan={penyimpanan} jabatan={jabatan} searchTerm={searchTerm}/>
      <Tambah
        referensi={ref}
        nik={nik}
        kategori={kategori}
        pengguna={pengguna}
        penyimpanan={penyimpanan}
      />
    </>
  )
}
