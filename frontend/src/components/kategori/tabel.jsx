import { IconEdit, IconCircleMinus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import Hapus from './hapus'
//import Ubah from './ubah'

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
          <tr>
            <th className='w-[50px]'>No</th>
            <th className='w-[80px]' onClick={() => requestSort('kode')}>
              Kode
            </th>
            <th className='' onClick={() => requestSort('kategori')}>
              Kategori
            </th>
            <th className='w-[200px]' onClick={() => requestSort('bidang')}>
              Bidang
            </th>
            <th className='w-[100px]'>Aksi</th>
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
                {/*
              <td>
                <button
                  type='button'
                  onClick={() => {
                    setDataUbah(data)
                    ubahRef.current.showModal()
                  }}
                >
                  <p>Ubah</p>
                  <IconEdit className='h-[20px] w-[20px]' stroke={2} />
                </button>
              </td>
              */}
                <td>
                  <button
                    className='flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-red-300 bg-sky-200 bg-white hover:bg-red-300 hover:font-bold hover:text-white'
                    type='button'
                    onClick={() => {
                      setDataHapus(data)
                      hapusRef.current.showModal()
                    }}
                  >
                    <p>Hapus</p>
                    <IconCircleMinus className='h-[20px] w-[20px]' stroke={2} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/*<Ubah referensi={ubahRef} data={dataUbah} />*/}
      <Hapus referensi={hapusRef} data={dataHapus} />
    </div>
  )
}
