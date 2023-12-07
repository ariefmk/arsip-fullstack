import { useState, useRef, useEffect } from 'react'
import { apiPublic as api } from '@/config'
import { tableHeader } from '@/lib/class'
import { TombolAksiHapus, TombolAksiUbah, TombolAksiLihat } from '@/lib/button'
import {
  IconCheck,
  IconEye,
  IconEdit,
  IconCircleMinus,
} from '@tabler/icons-react'
import Lihat from './lihat'
import Ubah from './ubah'
import Hapus from './hapus'

export default function Tabel({ datalist, penyimpanan }) {
  console.log(datalist)
  const [sortedData, setSortedData] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [dataHapus, setDataHapus] = useState({})
  const [dataUbah, setDataUbah] = useState({})
  const [lihatArsip, setLihatArsip] = useState({})
  const lihatRef = useRef({})
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
    <div className={`w-full overflow-x-auto px-[2rem]`}>
      <table className={`w-full table-fixed text-center`}>
        <thead>
          <tr
            className={`h-[2rem] border-b-2 border-black text-center text-base`}
          >
            <th className={`w-[50px]`}>No</th>
            <th className={`${tableHeader} w-[80px]`} onClick={() => requestSort('kode')}>
              Kode
            </th>
            <th className={`${tableHeader} w-[300px]`} onClick={() => requestSort('waktu')}>
              Waktu
            </th>
            <th className={`${tableHeader} w-[100px]`} onClick={() => requestSort('jenis')}>
              Jenis
            </th>
            <th className={`${tableHeader} w-[200px]`} onClick={() => requestSort('kategori')}>
              Kategori
            </th>
            <th className={`w-[400px]`}>Perihal</th>
            <th className={``}>Keterangan</th>
            <th className={`w-[150px] `} colSpan='3'>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((data, index) => (
              <tr
                className={`h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100`}
                key={data.kode}
              >
                <td>{index + 1}</td>
                <td>{data.kode}</td>
                <td>{data.waktu}</td>
                <td>{data.jenis}</td>
                <td className={`truncate px-4 hover:whitespace-normal`}>
                  {data.kategori.nama}
                </td>
                <td
                  className={`truncate px-4 text-left hover:whitespace-normal`}
                >
                  {data.nama}
                </td>
                <td className={`truncate text-left hover:whitespace-normal`}>
                  {data.keterangan}
                </td>
                <td className={`w-[50px]`}>
                  {/*
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-green-300 bg-sky-200 bg-white hover:bg-green-300 hover:font-bold hover:text-white`}
                    onClick={() => {
                      fetch(`${api.server}/auth/arsip/lihat/${data.id}`, {
                        method: 'GET',
                        headers: {
                          API_Key: api.key,
                        },
                      }).then(async (data) => {
                        const berkas = await data.json()
                        setLihatArsip(berkas.data.arsip)
                      })
                      lihatRef.current.showModal()
                    }}
                  >
                    <IconEye stroke={2} />
                  </button>*/}
                  <TombolAksiLihat
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      fetch(`${api.server}/auth/arsip/lihat/${data.id}`, {
                        method: 'GET',
                        headers: {
                          API_Key: api.key,
                        },
                      }).then(async (data) => {
                        const berkas = await data.json()
                        setLihatArsip(berkas.data.arsip)
                      })
                      lihatRef.current.showModal()
                    }}
                  />
                </td>
                <td className={`w-[50px]`}>
                  {/*
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-green-300 bg-sky-200 bg-white hover:bg-green-300 hover:font-bold hover:text-white`}
                  >
                    <IconEdit stroke={2} />
                  </button>*/}
                  <TombolAksiUbah
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      ubahRef.current.showModal()
                      setDataUbah(data)
                    }}
                  />
                </td>
                <td className={`w-[50px]`}>
                  {/*
                  <button
                    type='button'
                    className={`flex h-[2rem] w-full flex-row items-center justify-center gap-x-1 rounded-[10px] border-2 border-red-300 bg-sky-200 bg-white hover:bg-red-300 hover:font-bold hover:text-white`}
                  >
                    <IconCircleMinus stroke={2} />
                  </button>*/}
                  <TombolAksiHapus
                    className={`h-[2rem] w-full`}
                    onClick={() => {
                      hapusRef.current.showModal()
                      setDataHapus(data)
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Lihat referensi={lihatRef} berkas={lihatArsip} />
      <Ubah referensi={ubahRef} data={dataUbah} penyimpanan={penyimpanan}/>
      <Hapus referensi={hapusRef} data={dataHapus} />
    </div>
  )
}
