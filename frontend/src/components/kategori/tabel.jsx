import { IconEdit, IconCircleMinus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import { TombolAksiHapus, TombolAksiUbah } from '@/lib/button'
import { tableHeader } from '@/lib/class'
import Hapus from './hapus'
import Ubah from './ubah'

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

  return (
    <div className={`px-[2rem]`}>
      <table className='w-full table-fixed text-center'>
        <thead>
          <tr className={`h-[2rem] border-b-2 border-black`}>
            <th className='w-[50px]'>No</th>
            <th
              className={`${tableHeader} w-[80px]`}
              onClick={() => requestSort('kode')}
            >
              Kode
            </th>
            <th
              className={`${tableHeader} w-[300px]`}
              onClick={() => requestSort('kategori')}
            >
              Kategori
            </th>
            <th
              className={`${tableHeader} w-[200px]`}
              onClick={() => requestSort('bidang')}
            >
              Bidang
            </th>
            <th
              className={`${tableHeader} w-[150px]`}
              onClick={() => requestSort('jumlah')}
            >
              Jumlah Berkas
            </th>
            <th
              className={`${tableHeader}`}
              onClick={() => requestSort('keterangan')}
            >
              Keterangan
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
                key={data.kode}
                className='h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100'
              >
                <td>{index + 1}</td>
                <td>{data.kode}</td>
                <td>{data.kategori}</td>
                <td>{data.bidang}</td>
                <td>{data.jumlah} Berkas</td>
                <td>{data.keterangan}</td>
                <td className={`w-[50px]`}>
                  <TombolAksiUbah
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      console.log('a')
                      setDataUbah(data)
                      ubahRef.current.showModal()
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
