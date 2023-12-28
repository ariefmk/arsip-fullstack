import { useState, useRef, useEffect } from 'react'
import { apiPublic as api } from '@/config'
import { tableHeader } from '@/lib/class'
import {
  TombolAksiPersetujuan,
  TombolAksiHapus,
  TombolAksiUbah,
  TombolAksiLihat,
} from '@/lib/button'
import {
  IconCheck,
  IconEye,
  IconEdit,
  IconCircleMinus,
} from '@tabler/icons-react'
import Lihat from './lihat'
import Ubah from './ubah'
import Hapus from './hapus'
import Persetujuan from './persetujuan'

export default function Tabel(props) {
  const { datalist, penyimpanan, jabatan } = props
  const [sortedData, setSortedData] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [dataHapus, setDataHapus] = useState({})
  const [dataUbah, setDataUbah] = useState({})
  const [lihatArsip, setLihatArsip] = useState({})
  const [setuju, setSetuju] = useState([])
  const [kodeArsip, setKodeArsip] = useState('')
  const lihatRef = useRef()
  const ubahRef = useRef()
  const hapusRef = useRef()
  const persetujuanRef = useRef()
  const setujuRef = useRef()

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
            <th
              className={`${tableHeader} w-[80px]`}
              onClick={() => requestSort('kode')}
            >
              Kode
            </th>
            <th
              className={`${tableHeader} w-[300px]`}
              onClick={() => requestSort('waktu')}
            >
              Waktu
            </th>
            <th
              className={`${tableHeader} w-[100px]`}
              onClick={() => requestSort('jenis')}
            >
              Jenis
            </th>
            <th
              className={`${tableHeader} w-[200px]`}
              onClick={() => requestSort('kategori')}
            >
              Kategori
            </th>
            <th className={`w-[200px]`}>Status Persetujuan</th>
            <th className={``}>Perihal</th>
            {jabatan === 'Kepala Bidang' ? (
              <th className={`w-[150px] `} colSpan='3'>
                Aksi
              </th>
            ) : (
              <th className={`w-[100px] `} colSpan='2'>
                Aksi
              </th>
            )}
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
                <td className={`truncate hover:whitespace-normal`}>
                  {data.persetujuan
                    ? `${data.persetujuan.length} Persetujuan`
                    : 'Belum Disetujui'}
                </td>
                <td
                  className={`truncate px-4 text-left hover:whitespace-normal`}
                >
                  {data.nama}
                </td>
                <td className={`w-[50px]`}>
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
                {jabatan === 'Kepala Bidang' ? (
                  <>
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
                          hapusRef.current.showModal()
                        }}
                      />
                    </td>
                  </>
                ) : (
                  <td className={`w-[50px]`}>
                    <TombolAksiPersetujuan
                      className={`h-[2rem] w-full`}
                      disabled={data.persetujuan?.some((a) => {
                        return a.jabatan === jabatan
                      })}
                      onClick={() => {
                        persetujuanRef.current.showModal()
                        setKodeArsip(data.kode)
                      }}
                    />
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <Lihat referensi={lihatRef} berkas={lihatArsip} />
      <Ubah referensi={ubahRef} data={dataUbah} penyimpanan={penyimpanan} />
      <Hapus referensi={hapusRef} data={dataHapus} />
      <Persetujuan referensi={persetujuanRef} kode={kodeArsip} />
    </div>
  )
}
