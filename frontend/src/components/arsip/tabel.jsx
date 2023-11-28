import { apiPublic as api } from '@/config'
import { useState, useRef, useEffect } from 'react'
import {
  IconCheck,
  IconEye,
  IconEdit,
  IconCircleMinus,
} from '@tabler/icons-react'
import Lihat from './lihat'

export default function Tabel({ datalist }) {
  const [sortedData, setSortedData] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [dataHapus, setDataHapus] = useState({})
  const [dataUbah, setDataUbah] = useState({})
  const [lihatArsip, setLihatArsip] = useState({})
  const lihatRef = useRef()
  const ubahRef = useRef()
  const hapusRef = useRef()

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
            <th className={`w-[100px]`} onClick={() => requestSort('kode')}>
              Kode
            </th>
            <th className={`w-[300px]`} onClick={() => requestSort('waktu')}>
              Waktu
            </th>
            <th className={`w-[200px]`}>Perihal</th>
            <th className={`w-[100px]`} onClick={() => requestSort('jenis')}>
              Jenis
            </th>
            <th className={`w-[200px]`} onClick={() => requestSort('kategori')}>
              Kategori
            </th>
            <th>Keterangan</th>
            <th className={`w-[150px]`} colSpan='3'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((data, index) => (
              <tr
                className={`h-[3rem] odd:bg-gray-200 even:bg-red-200 hover:bg-teal-100`}
                key={data.kode}
              >
                <td>{index + 1}</td>
                <td>{data.kode}</td>
                <td>{data.waktu}</td>
                <td>{data.nama}</td>
                <td>{data.jenis}</td>
                <td>{data.kategori}</td>
                <td className={`text-left`}>{data.keterangan}</td>
                <td className={`w-[50px]`}>
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-green-300 bg-sky-200 bg-white hover:bg-green-300 hover:font-bold hover:text-white`}
                    onClick={() => {
                      fetch(`${api.server}/auth/arsip/lihat/${data.id}`, {
                        method: 'GET',
                        headers: {
                          API_Key: api.key,
                        },
                      }).then(async(data) => {
                        setLihatArsip((await data.json()).data.arsip)
                      })
                      lihatRef.current.showModal()
                    }}
                  >
                    <IconEye stroke={2} />
                  </button>
                </td>
                <td className={`w-[50px]`}>
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-green-300 bg-sky-200 bg-white hover:bg-green-300 hover:font-bold hover:text-white`}
                  >
                    <IconEdit stroke={2} />
                  </button>
                </td>
                <td className={`w-[50px]`}>
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-red-300 bg-sky-200 bg-white hover:bg-red-300 hover:font-bold hover:text-white`}
                  >
                    <IconCircleMinus stroke={2} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Lihat referensi={lihatRef} berkas={lihatArsip} />
    </div>
  )
}
