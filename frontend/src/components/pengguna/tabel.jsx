'use client'
import { IconEdit, IconCircleMinus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import { TombolAksiHapus, TombolAksiUbah } from '@/lib/button'
import Hapus from './hapus'
import Ubah from './ubah'
import { kapital } from '@/lib'

export default function Tabel({ datalist }) {
  const [sortedData, setSortedData] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [dataHapus, setDataHapus] = useState({})
  const [dataUbah, setDataUbah] = useState({})
  const hapusRef = useRef()
  const ubahRef = useRef()

  useEffect(() => {
    setSortedData([...datalist])
  }, [datalist])

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    const sorted = [...sortedData].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] < b[key] ? -1 : 1
      } else {
        return a[key] > b[key] ? -1 : 1
      }
    })
    setSortedData(sorted)
  }

  const handleUbah = (nik) => {
    //console.log('Ubah data dengan NIK', nik)
  }
  /*
  const handleHapus = (nik) => {
    setDataHapus([nik])
  }
  */

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full table-fixed text-center'>
        <thead>
          <tr className='h-[2rem] text-base'>
            <th className='w-[50px]'>No</th>
            <th className='w-[90px]' onClick={() => requestSort('hak')}>
              Hak Akses
            </th>
            <th className='w-[160px]' onClick={() => requestSort('nik')}>
              NIK
            </th>
            <th className='w-[200px]' onClick={() => requestSort('nama')}>
              Nama
            </th>
            <th className='w-[140px]' onClick={() => requestSort('jabatan')}>
              Jabatan
            </th>
            <th className='w-[120px]' onClick={() => requestSort('bidang')}>
              Bidang
            </th>
            <th className='w-[160px]' onClick={() => requestSort('tanggal')}>
              Tanggal Lahir
            </th>
            <th className='w-[120px]' onClick={() => requestSort('kelamin')}>
              Jenis Kelamin
            </th>
            <th className='w-[180px]' onClick={() => requestSort('telepon')}>
              Nomor Telepon
            </th>
            <th className='w-[160px]' onClick={() => requestSort('alamat')}>
              Alamat
            </th>
            <th className='w-[100px]' colSpan='2'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((data, index) => (
              <tr
                key={data.nik}
                className='h-[3rem] odd:bg-gray-200 even:bg-red-200 hover:bg-teal-100'
              >
                <td>{index + 1}</td>
                <td>{kapital(data.hak)}</td>
                <td>{data.nik}</td>
                <td>{data.nama}</td>
                <td>{data.jabatan}</td>
                <td>
                  {data.bidang === 1
                    ? 'Kesra & Pelayanan'
                    : data.bidang === 2
                    ? 'Pemerintahan'
                    : data.bidang === 3
                    ? 'Kewilayahan'
                    : data.bidang === 4
                    ? 'Keuangan'
                    : data.bidang === 5
                    ? 'Umum & Perencanaan'
                    : null}
                </td>
                <td>{data.tanggal}</td>
                <td>
                  {data.kelamin === 1
                    ? 'Laki-Laki'
                    : data.kelamin === 2
                    ? 'Perempuan'
                    : null}
                </td>
                <td>{data.telepon}</td>
                <td className='truncate hover:whitespace-normal'>
                  {data.alamat}
                </td>
                <td className='w-[50px]'>
                  <TombolAksiUbah
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      setDataUbah(data)
                      ubahRef.current.showModal()
                    }}
                  />
                </td>
                <td className='w-[50px]'>
                  <TombolAksiHapus
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      setDataHapus(data)
                      hapusRef.current.showModal()
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Hapus referensi={hapusRef} data={dataHapus} />
      <Ubah referensi={ubahRef} data={dataUbah} />
    </div>
  )
}
