'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Th, useUrut } from '@/components/tabel'
import Header from '@/components/tabel/headerv2'
import Tambah from './tambah'
import Ubah from './ubah'
import { TombolAksiHapus, TombolAksiUbah, TombolAksiUnduh } from '@/lib/button'
import { ModalHapus } from '@/lib/modal'
import Info from '@/lib/info'

export default function Tabel(props) {
  const { datalist, kode } = props
  const [pencarian, setPencarian] = useState('')
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const [tunggu, setTunggu] = useState(false)
  const [kodeHapus, setKodeHapus] = useState('')
  const [dataPenyimpanan, setDataPenyimpanan] = useState({})
  const tambahRef = useRef()
  const hapusRef = useRef()
  const ubahRef = useRef()
  const router = useRouter()
  const { dataUrut, urut } = useUrut(datalist, pencarian)

  const hapusHandler = async (kode) => {
    try {
      const kirim = await fetch('/api/penyimpanan/hapus', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kode }),
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

  const unduhHandler = async (kode) => {
    try {
      setTunggu(true)
      const respon = await fetch(`/api/penyimpanan/unduh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kode }),
      })
      const berkas = await respon.blob()
      let link = document.createElement('a')
      link.href = URL.createObjectURL(berkas)
      link.download = `Label Penyimpanan ${kode} ()`
      link.click()
      if (respon.ok) {
        setPesan('Berhasil mengunduh label penyimpanan')
      }
      URL.revokeObjectURL(link.href)
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      setTunggu(false)
      setToast(true)
    }
  }

  return (
    <div>
      <Header cari={setPencarian} tambahRef={tambahRef} />
      <div className={`w-full overflow-x-auto px-[1rem]`}>
        <table className={`w-full table-fixed text-center`}>
          <thead>
            <tr className={`h-[2rem] border-b-2 border-black text-base`}>
              <th className={`w-[50px]`}>No</th>
              <Th w={80} text='Kode' onClick={() => urut('kode')} />
              <Th
                w={400}
                text='Nama Penyimpanan'
                onClick={() => urut('nama')}
              />
              <Th w={100} text='Jumlah Berkas' onClick={() => urut('jumlah')} />
              <Th w={200} text='Bidang' onClick={() => urut('bidang')} />
              <Th text='Lokasi Penyimpanan' onClick={() => urut('lokasi')} />
              <Th text='Keterangan' onClick={() => urut('keterangan')} />

              <th className={`w-[150px]`} colSpan='3'>
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
                  <td className={`text-center`}>{data.jumlah}</td>
                  <td>{data.bidang}</td>
                  <td>{data.lokasi}</td>
                  <td>{data.keterangan}</td>
                  <td className={`w-[50px]`}>
                    <TombolAksiUnduh
                      className={`h-[2rem] w-full`}
                      disabled={tunggu}
                      onClick={() => {
                        unduhHandler(data.kode)
                      }}
                    />
                  </td>
                  <td className={`w-[50px]`}>
                    <TombolAksiUbah
                      className={`h-[2rem] w-full`}
                      onClick={() => {
                        ubahRef.current.showModal()
                        setDataPenyimpanan(data)
                      }}
                    />
                  </td>
                  <td className={`w-[50px]`}>
                    <TombolAksiHapus
                      className={`h-[2rem] w-full`}
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
        kode={kode}
        setPesan={setPesan}
        setToast={setToast}
      />
      <Ubah
        ref={ubahRef}
        penyimpanan={dataPenyimpanan}
        setToast={setToast}
        setPesan={setPesan}
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
