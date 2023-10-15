import {
  IconCirclePlus,
  IconCircleMinus,
  IconEdit,
  IconSearch,
} from '@tabler/icons-react'
import Header from './components/header'
import Tabel from './components/tabel'

export default function Pengguna() {
  const datalist = [
    {
      hak: 'Pengguna',
      nik: '6311041302010004',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2001',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mampari RT 4 dasgs fsefs fsf',
    },
    {
      hak: 'Pengguna',
      nik: '6311041302010002',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2001',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mampari RT 4 dasgs fsefs fsf',
    },
    {
      hak: 'Pengguna',
      nik: '6311041302010011',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2022',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mapari sefs fsf',
    },
  ]
  return (
    <div>
      <Header />
      <Tabel datalist={datalist} />
    </div>
  )
}
