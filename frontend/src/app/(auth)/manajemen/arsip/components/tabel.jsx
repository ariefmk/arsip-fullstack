'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Th, useUrut } from '@/components/tabel'
import Header from './header'
import Tambah from './tambah'
import Ubah from './ubah'
import Rincian from './rincian'
import Persetujuan from './persetujuan'
import {
  TombolAksiPersetujuan,
  TombolAksiHapus,
  TombolAksiUbah,
  TombolAksiLihat,
} from '@/lib/button'
import { ModalHapus } from '@/lib/modal'
import Info from '@/lib/info'

export default function Tabel(props) {
  const { datalist, pengguna } = props
  const { kategori, penyimpanan, arsip } = datalist
  const { jabatan } = pengguna
  const tambah = { kategori, penyimpanan }
  const [pencarian, setPencarian] = useState('')
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const [kodeArsip, setKodeArsip] = useState('')
  const [arsipUbah, setArsipUbah] = useState(null)
  const [listPenyimpanan, setListPenyimpanan] = useState(null)
  const [rincian, setRincian] = useState({})
  const tambahRef = useRef()
  const ubahRef = useRef()
  const hapusRef = useRef()
  const rincianRef = useRef()
  const persetujuanRef = useRef()
  const router = useRouter()
  const { dataUrut, urut } = useUrut(arsip, pencarian)

  const rincianHandler = async (kode) => {
    try {
      const kirim = await fetch(`/api/arsip/rincian?kode=${kode}`, {
        method: 'GET',
      })
      const { status, pesan, data } = await kirim.json()
      setRincian(data.arsip)
    } finally {
      rincianRef.current.showModal()
    }
  }
  const ubahHandler = async (kode) => {
    try {
      const kirim = await fetch('/api/arsip/ubah', {
        method: 'GET',
        headers: {
          kode,
        },
      })
      const { data } = await kirim.json()
      setArsipUbah(data.arsip)
      setListPenyimpanan(data.penyimpanan)
    } finally {
      ubahRef.current.showModal()
    }
  }

  const hapusHandler = async (kode) => {
    try {
      const kirim = await fetch('/api/arsip/hapus', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kode }),
      })
      const { status, pesan } = await kirim.json()
      if (status === 200) {
        setPesan(pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      hapusRef.current.close()
      router.refresh()
      setToast(true)
    }
  }

  const persetujuanHandler = (kode) => {
    persetujuanRef.current.showModal()
  }

  return (
    <div>
      <Header cari={setPencarian} tambahRef={tambahRef} jabatan={jabatan}/>
      <div className={`w-full overflow-x-auto px-[1rem]`}>
        <table className={`w-full table-fixed text-center`}>
          <thead>
            <tr className={`h-[2rem] border-b-2 border-black text-base`}>
              <th className={`w-[50px]`}>No</th>
              <Th w={80} text='Kode' onClick={() => urut('kode')} />
              <Th w={300} text='Waktu' onClick={() => urut('waktu')} />
              <Th w={100} text='Jenis' onClick={() => urut('jenis')} />
              <Th w={200} text='Kategori' onClick={() => urut('kategori')} />
              <Th w={200} text='Bidang' onClick={() => urut('bidang')} />
              <Th w={200} text='Status Persetujuan' />
              <Th text='Perihal' />
              {jabatan === 'Kepala Bidang' ? (
                <th className={`w-[150px]`} colSpan='3'>
                  Aksi
                </th>
              ) : (
                <th className={`w-[100px]`} colSpan='2'>
                  Aksi
                </th>
              )}
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
                  <td>{data.waktu}</td>
                  <td>{data.jenis}</td>
                  <td>{data.kategori.nama}</td>
                  <td>{data.bidang}</td>
                  <td>{data.persetujuan.status}</td>
                  <td className={`truncate px-4 hover:whitespace-normal`}>
                    {data.perihal}
                  </td>
                  <td className={`w-[50px]`}>
                    <TombolAksiLihat
                      onClick={() => {
                        rincianHandler(data.kode)
                      }}
                    />
                  </td>
                  {jabatan === 'Kepala Bidang' ? (
                    <>
                      <td className={`w-[50px]`}>
                        <TombolAksiUbah
                          onClick={() => {
                            ubahHandler(data.kode)
                          }}
                        />
                      </td>
                      <td className={`w-[50px]`}>
                        <TombolAksiHapus
                          onClick={() => {
                            setKodeArsip(data.kode)
                            hapusRef.current.showModal()
                          }}
                        />
                      </td>
                    </>
                  ) : (
                    <td className={`w-[50px]`}>
                      <TombolAksiPersetujuan
                        disabled={data.persetujuan.oleh?.some(
                          (e) => e.jabatan === jabatan
                        )}
                        onClick={() => {
                          setKodeArsip(data.kode)
                          persetujuanHandler(data.kode)
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Tambah
        ref={tambahRef}
        datalist={tambah}
        pembuat={pengguna.nik}
        setPesan={setPesan}
        setToast={setToast}
      />
      <Ubah
        ref={ubahRef}
        arsip={arsipUbah}
        penyimpanan={listPenyimpanan}
        setPesan={setPesan}
        setToast={setToast}
      />
      <Rincian ref={rincianRef} datalist={rincian} />
      <Persetujuan
        ref={persetujuanRef}
        kode={kodeArsip}
        setPesan={setPesan}
        setToast={setToast}
      />
      <ModalHapus
        ref={hapusRef}
        onHapus={() => {
          hapusHandler(kodeArsip)
        }}
        onBatal={() => {
          hapusRef.current.close()
        }}
      />
      {toast && <Info pesan={pesan} info={{ toast, setToast }} />}
    </div>
  )
}
