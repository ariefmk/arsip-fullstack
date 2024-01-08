'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { TombolAksiHapus, TombolAksiUbah, TombolAksiUnduh } from '@/lib/button'
import Ubah from './ubah'
import Hapus from './hapus'

export default function Tabel(props) {
  const { datalist, searchTerm } = props
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

  useEffect(() => {
    const filteredData = datalist.filter((data) => {
      return Object.values(data).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    setSortedData(filteredData)
  }, [searchTerm, datalist])

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
  const unduhHandler = async (kode) => {
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
    link.target = '_blank'
    //link.download = `${new Date()}.pdf`
    link.click()
  }
  return (
    <div className={`w-full overflow-x-auto px-[2rem]`}>
      <table className={`w-full table-fixed text-center`}>
        <thead>
          <tr
            className={`h-[2rem] border-b-2 border-black text-center text-base`}
          >
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
              className={`w-[400px]`}
              onClick={() => {
                requestSort('nama')
              }}
            >
              Nama
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
              <tr
                key={data.kode}
                className={`h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100`}
              >
                <td>{index + 1}</td>
                <td>{data.kode}</td>
                <td>{data.nama}</td>
                <td>{data.bidang}</td>
                <td>{data.lokasi}</td>
                <td>{data.keterangan}</td>
                <td className={`w-[50px]`}>
                  <TombolAksiUnduh
                    className={`h-[2rem] w-full`}
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
                      setDataUbah(data)
                    }}
                  />
                </td>
                <td className={`w-[50px]`}>
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
      <Ubah referensi={ubahRef} data={dataUbah} />
      <Hapus referensi={hapusRef} data={dataHapus} />
    </div>
  )
}
