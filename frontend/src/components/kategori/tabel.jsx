import { IconEdit, IconCircleMinus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import { TombolAksiHapus, TombolAksiUbah } from '@/lib/button'
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
    <div>
      <table className='w-full table-fixed text-center'>
        <thead>
          <tr className={`h-[2rem]`}>
            <th className='w-[50px]'>No</th>
            <th
              className='w-[80px] cursor-pointer hover:bg-gray-200'
              onClick={() => requestSort('kode')}
            >
              Kode
            </th>
            <th
              className='w-[300px] cursor-pointer hover:bg-gray-200'
              onClick={() => requestSort('kategori')}
            >
              Kategori
            </th>
            <th
              className='w-[200px] cursor-pointer hover:bg-gray-200'
              onClick={() => requestSort('bidang')}
            >
              Bidang
            </th>
            <th
              className={`w-[150px] cursor-pointer hover:bg-gray-200`}
              onClick={() => requestSort('jumlah')}
            >
              Jumlah Berkas
            </th>
            <th
              className={`cursor-pointer hover:bg-gray-200`}
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
                className='h-[3rem] odd:bg-gray-200 even:bg-red-200 hover:bg-teal-100'
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
