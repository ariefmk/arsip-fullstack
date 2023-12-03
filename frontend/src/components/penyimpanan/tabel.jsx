import { useState, useEffect, useRef } from 'react'
import { TombolAksiHapus, TombolAksiUbah, TombolAksiUnduh } from '@/lib/button'
import Ubah from './ubah'
import Hapus from './hapus'

export default function Tabel({ datalist }) {
  const ubahRef = useRef()
  const hapusRef = useRef()
  const [dataUbah, setDataUbah] = useState({})
  const [dataHapus, setDataHapus] = useState({})
  const [sortedData, setSortedData] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  })

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
  return (
    <div className={`w-full overflow-x-auto`}>
      <table className={`w-full table-fixed text-center`}>
        <thead>
          <tr className={`h-[2rem] text-center text-base`}>
            <th className={`w-[50px]`}>No</th>
            <th
              className={`w-[80px]`}
              onClick={() => {
                requestSort('kode')
              }}
            >
              Kode
            </th>
            <th
              className={`w-[200px]`}
              onClick={() => {
                requestSort('bidang')
              }}
            >
              Bidang
            </th>
            <th
              className={`w-[400px]`}
              onClick={() => {
                requestSort('nama')
              }}
            >
              Nama
            </th>
            <th
              onClick={() => {
                requestSort('lokasi')
              }}
            >
              Lokasi
            </th>
            <th
              onClick={() => {
                requestSort('keterangan')
              }}
            >
              Keterangan
            </th>
            <th className={`w-[150px]`} colSpan='3'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((data, index) => (
              <tr key={data.kode}>
                <td>{index + 1}</td>
                <td>{data.kode}</td>
                <td>{data.bidang}</td>
                <td>{data.nama}</td>
                <td>{data.lokasi}</td>
                <td>{data.keterangan}</td>
                <td className={`w-[50px]`}>
                  <TombolAksiUnduh className={`w-full`} />
                </td>
                <td className={`w-[50px]`}>
                  <TombolAksiUbah
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      ubahRef.current.showModal()
                      setDataUbah(data)
                    }}
                  />
                </td>
                <td className={`w-[50px]`}>
                  <TombolAksiHapus
                    className={`w-full`}
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
      <Ubah referensi={ubahRef} data={dataUbah} />
      <Hapus referensi={hapusRef} data={dataHapus} />
    </div>
  )
}
