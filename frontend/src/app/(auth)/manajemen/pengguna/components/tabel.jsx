'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IconCirclePlus } from '@tabler/icons-react'
import Header from './header'
import Ubah from './ubah'
import { Th, useUrut } from '@/components/tabel'
import { TombolAksiHapus, TombolAksiUbah } from '@/lib/button'
import { ModalHapus } from '@/lib/modal'
import Info from '@/lib/info'

export default function Tabel(props) {
  const [pencarian, setPencarian] = useState('')
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const [nik, setNik] = useState('')
  const [dataPengguna, setDataPengguna] = useState({})
  const hapusRef = useRef()
  const ubahRef = useRef()
  const router = useRouter()
  const { datalist } = props
  const { dataUrut, urut } = useUrut(datalist, pencarian)

  const hapusHandler = async (nik) => {
    try {
      const kirim = await fetch('/api/pengguna/hapus', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nik }),
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

  const ubahHandler = async (nik) => {
    const ambil = await fetch(`pengguna/lihat?nik=${nik}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const respon = await ambil.json()
    setDataPengguna(respon.data)
    ubahRef.current.showModal()
  }

  return (
    <div>
      <Header cari={setPencarian} />
      <div className={`w-full overflow-x-auto px-[1rem]`}>
        <table className={`w-full table-fixed text-center`}>
          <thead>
            <tr className={`h-[2rem] border-b-2 border-black text-base`}>
              <th className={`w-[50px]`}>No</th>
              <Th w={90} text='Hak Akses' onClick={() => urut('hak')} />
              <Th w={160} text='NIK' onClick={() => urut('nik')} />
              <Th w={200} text='Nama Lengkap' onClick={() => urut('nama')} />
              <Th w={140} text='Jabatan' onClick={() => urut('jabatan')} />
              <Th w={120} text='Bidang' onClick={() => urut('bidang')} />
              <Th
                w={160}
                text='Tanggal Lahir'
                onClick={() => urut('tanggal')}
              />
              <Th
                w={120}
                text='Jenis Kelamin'
                onClick={() => urut('kelamin')}
              />
              <Th w={180} text='Alamat' onClick={() => urut('alamat')} />
              <th className={`w-[100px]`} colSpan='2'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUrut &&
              dataUrut.map((data, index) => (
                <tr
                  key={data.nik}
                  className={`h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100`}
                >
                  <td>{index + 1}</td>
                  <td>{data.hak}</td>
                  <td>{data.nik}</td>
                  <td>{data.nama}</td>
                  <td>{data.jabatan}</td>
                  <td>{data.bidang}</td>
                  <td>{data.tanggal}</td>
                  <td>{data.kelamin}</td>
                  <td className={`truncate hover:whitespace-normal`}>
                    {data.alamat}
                  </td>
                  <td className={`w-[50px]`}>
                    <TombolAksiUbah
                      onClick={() => {
                        ubahHandler(data.nik)
                      }}
                    />
                  </td>
                  <td>
                    <TombolAksiHapus
                      onClick={() => {
                        setNik(data.nik)
                        hapusRef.current.showModal()
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Ubah ref={ubahRef} pengguna={dataPengguna} />
      <ModalHapus
        ref={hapusRef}
        onHapus={() => {
          hapusHandler(nik)
        }}
        onBatal={() => {
          hapusRef.current.close()
        }}
      />
      {toast && <Info pesan={pesan} info={{ toast, setToast }} />}
    </div>
  )
}
