'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { TombolAksiHapus, TombolAksiUbah } from '@/lib/button'
import { Th, useUrut } from '@/components/tabel'
import { ModalHapus } from '@/lib/modal'
import Header from '@/components/tabel/headerv2'
import Tambah from './tambah'
import Ubah from './ubah'
import Info from '@/lib/info'

export default function Tabel(props) {
  const { datalist } = props
  const [pencarian, setPencarian] = useState('')
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const [tunggu, setTunggu] = useState(false)
  const [kodeHapus, setKodeHapus] = useState('')
  const [dataKategori, setDataKategori] = useState({})
  const tambahRef = useRef()
  const hapusRef = useRef()
  const ubahRef = useRef()
  const router = useRouter()
  const { dataUrut, urut } = useUrut(datalist, pencarian)
  const listKode = datalist.map((data) => data.kode)


  const hapusHandler = async (kode) => {
    try {
      const kirim = await fetch('/api/kategori/hapus', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({kode})
      })
      const respon = await kirim.json()
      if (respon.status === 200) {
        setPesan(respon.pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      hapusRef.current.close()
      router.refresh()
      setToast(true)
    }
  }

  return (
    <div>
      <Header cari={setPencarian} tambahRef={tambahRef}/>
      <div className={`w-full overflow-x-auto px-[1rem]`}>
        <table className={`w-full table-fixed text-center`}>
          <thead>
            <tr className={`h-[2rem] border-b-2 border-black text-base`}>
              <th className={`w-[50px]`}>No</th>
              <Th w={80} text='Kode' onClick={() => urut('kode')} />
              <Th w={200} text='Nama Kategori' onClick={() => urut('nama')} />
              <Th w={100} text='Jumlah Berkas' onClick={() => urut('jumlah')} />
              <Th w={200} text='Bidang' onClick={() => urut('bidang')} />
              <Th text='Keterangan' onClick={() => urut('keterangan')} />
              <th className={`w-[100px]`} colSpan='2'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUrut &&
              dataUrut.map((data, index) => (
                <tr
                  key={data.kode}
                  className={`h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100`}
                >
                  <td>{index + 1}</td>
                  <td>{data.kode}</td>
                  <td>{data.nama}</td>
                  <td>{data.jumlah}</td>
                  <td>{data.bidang}</td>
                  <td className={`w-[645px] truncate px-4 hover:whitespace-normal`}>{data.keterangan}</td>
                  <td className={`w-[50px]`}>
                    <TombolAksiUbah
                      className={`h-[2rem] w-full`}
                      onClick={() => {
                        setDataKategori(data)
                        ubahRef.current.showModal()
                      }}
                    />
                  </td>
                  <td className={`w-[50px]`}>
                    <TombolAksiHapus
                      className={`h-[2rem] w-full`}
                      disabled={parseInt(data.jumlah.match(/\d+/)[0])? true: false}
                      onClick={() => {
                        setKodeHapus(data.kode)
                        hapusRef.current.showModal()
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Tambah
        ref={tambahRef}
        setPesan={setPesan}
        setToast={setToast}
        listKode={listKode}
      />
      <Ubah
        ref={ubahRef}
        setToast={setToast}
        setPesan={setPesan}
        kategori={dataKategori}
      />
      <ModalHapus
        ref={hapusRef}
        onHapus={() => {
          hapusHandler(kodeHapus)
        }}
        onBatal={() => {
          hapusRef.current.close()
        }}
      />
      {toast && <Info pesan={pesan} info={{ toast, setToast }} />}
    </div>
  )
}
