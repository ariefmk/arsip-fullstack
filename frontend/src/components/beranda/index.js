'use client'
import Arsip from './arsip'
import Kartu from './kartu'
import { useRef } from 'react'

export default function Beranda({ data, grafik, pengguna }) {
  const kategoriRef = useRef()
  console.log(pengguna)
  return (
    <div className='flex items-center justify-center '>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='mb-4 mt-10 text-3xl'>
          Selamat Datang, {pengguna.nama}!
        </h1>
        {pengguna.hakAkses === 'Admin' && (
          <div className='grid auto-cols-max grid-cols-1 gap-4'>
            <Kartu judul='Jumlah Pengguna' nilai={data.pengguna} />
          </div>
        )}
        {/*
          <Kartu judul='Jumlah Pengguna' nilai={data.pengguna} />
          */}
        {pengguna.hakAkses === 'Standar' && (
          <div className='grid auto-cols-max grid-cols-2 gap-4'>
            <Kartu
              judul='Jumlah Arsip'
              nilai={data.arsip}
              onClick={() => {
                kategoriRef.current.showModal()
              }}
            />
            <Kartu judul='Jumlah Kategori Arsip' nilai={data.kategori} />
            <Kartu judul='Jumlah Penyimpanan Arsip' nilai={data.penyimpanan} />
            <Kartu judul='Arsip Bulan Ini' nilai={data.arsipBulanan} />
          </div>
        )}
        {/*
          <Kartu judul='Jumlah Arsip' nilai={7} />
          <Kartu judul='Jumlah Kategori Arsip' nilai={2} />
          <Kartu judul='Jumlah Arsip Bulan Ini' nilai={7} />
          {/*
          <Kartu judul='Aktivitas Hari Ini' nilai={0} />
          <Kartu judul='Kategori' nilai={0} />
          {/*Umum*}
          <SummaryCard title="Arsip" value={data.arsip} color="green" />
          <SummaryCard title="Kategori Arsip" value={data.kategori} color="green" />
          <SummaryCard title="Arsip Bulan Ini" value={data.arsipBulanan} color="green" />
          {/*Lain*}
          <SummaryCard title="Arsip Bidang Lain" value={data.arsip} color="green" />
          <SummaryCard title="Kategori Arsip Bidang Lain" value={data.kategori} color="green" />
          <SummaryCard title="Arsip Bulan Ini" value={data.arsipBulanan} color="green" />
        */}

        <div>
          <Arsip referensi={kategoriRef} grafik={grafik.kategori} />
        </div>
      </div>
    </div>
  )
}
